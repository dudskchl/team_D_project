from flask import Flask, render_template, Response, request
from flask_socketio import SocketIO
from flask_cors import CORS
from ultralytics import YOLO
import argparse
import supervision as sv
import numpy as np
import cv2


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

class_id_mapping = { 
    'anger': 0,
    'disgust': 1,
    'happy': 2,
    'fear': 3,
    'neutral': 4,
    'sad': 5,
    'surprise': 6,
}

@socketio.on('send emotion')
def handle_emotion(data):
    global target_class_id  
    emotion = data['emotion']
    target_class_id = class_id_mapping.get(emotion) 
    print('Received emotion:', emotion)

camera = cv2.VideoCapture(0)  # use 0 for web camera
# for local webcam use cv2.VideoCapture(0)
def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="YOLOv8 live")
    parser.add_argument(
        "--webcam-resolution", 
        default=[1920, 1080], 
        nargs=2, 
        type=int
    )
    args = parser.parse_args()
    return args

def gen_frames():  # generate frame by frame from camera
    args = parse_arguments()
    frame_width, frame_height = args.webcam_resolution
    camera.set(3, frame_width)
    camera.set(4, frame_height)

    model = YOLO("best.pt")
    box_annotator = sv.BoxAnnotator(thickness=2, text_thickness=2, text_scale=1)
    target_class_confidence = 0.7  # The minimum confidence for the target class
    
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            result = model(frame, agnostic_nms=True)[0]
            detections = sv.Detections.from_yolov8(result)
            print(detections)
            
            for _, _, confidence, class_id, _ in detections:
                if class_id == target_class_id and confidence >= target_class_confidence:
                    socketio.emit('emotion result', {'result': 'success'})
                    print('success')
                else:
                    socketio.emit('emotion result', {'result': 'fail'})
            labels = [f"{model.model.names[class_id]} {confidence:0.2f}" for _, _, confidence, class_id, _ in detections]
            print(labels)
            frame = box_annotator.annotate(scene=frame, detections=detections, labels=labels)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)

if __name__ == '__main__':
    socketio.run(app)
