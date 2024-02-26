import React, { useEffect, useRef, useState } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import { SendData, connectToWebSocket } from "../../helper/connection-helper";
import { Button } from "react-bootstrap";

var xPos = 0;
var yPos = 0;

function clearBackground(context: CanvasRenderingContext2D): void {
  const { width, height } = context.canvas;
  context.rect(0, 0, width, height);
  context.fillStyle = "#cfeafa";
  context.fill();
}

function drawPlayer(
  context: CanvasRenderingContext2D,
  position: Point2D
): void {
  context.beginPath();
  context.arc(position.x, position.y, 10, 0, Math.PI * 2);
  context.fillStyle = "black";
  context.fill();
}

function drawOpponent(
  context: CanvasRenderingContext2D,
  position: Point2D
): void {
  context.beginPath();
  context.moveTo(75, 50);
  context.lineTo(100, 75);
  context.lineTo(100, 25);
  context.fill();
}

interface Point2D {
  x: number;
  y: number;
}

const useFrameTime = () => {
  const [frameTime, setFrameTime] = React.useState(performance.now());
  React.useEffect(() => {
    let frameId: any;
    const frame = (time: any) => {
      setFrameTime(time);
      frameId = requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);
  return frameTime;
};

const Game = () => {
  var arrowKeys = {
    down: useKeyPress("ArrowDown"),
    up: useKeyPress("ArrowUp"),
    left: useKeyPress("ArrowLeft"),
    right: useKeyPress("ArrowRight"),
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Makes this component render at the browser refresh rate (60fps)
  const frameTime = useFrameTime();

  const context = canvasRef.current?.getContext("2d");
  if (context != null) {
    clearBackground(context);

    if (arrowKeys.up) {
      yPos = yPos - 1;
    }
    if (arrowKeys.down) {
      yPos = yPos + 1;
    }
    if (arrowKeys.left) {
      xPos = xPos - 1;
    }
    if (arrowKeys.right) {
      xPos = xPos + 1;
    }
    SendData({ Score: 99, x: xPos, y: yPos });
    drawPlayer(context, { x: xPos, y: yPos });
    drawOpponent(context, { x: xPos, y: yPos });
  }

  if (isConnected) {
    return (
      <div className="game">
        <h2>{frameTime}</h2>
        <canvas ref={canvasRef} height={480} width={720}>
          Oops! Your browser doesn't support the canvas component.
        </canvas>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Waiting to connect</h1>
        <Button
          onClick={() => handleClick(setIsConnected)}
          variant="outline-light"
        >
          Connect
        </Button>
      </div>
    );
  }
};

const handleClick = async (callback: Function) => {
  try {
    // Call your async function here
    const result = await connectToWebSocket(callback);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default Game;
