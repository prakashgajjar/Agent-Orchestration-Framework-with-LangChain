import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from orchestrator import MultiAgentOrchestrator

load_dotenv()

app = Flask(__name__)
CORS(app)

orchestrator = MultiAgentOrchestrator()

@app.route("/run-workflow", methods=["POST"])
def run_workflow():
    data = request.json
    topic = data.get("topic")

    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    result = orchestrator.run(topic)
    return jsonify(result)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
