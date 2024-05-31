import { useRef, useEffect, useState, MouseEventHandler } from "react";
import { IconColorPicker } from "../../icons/IconColorPicker";
import { SelectedColor } from "../../icons/SelectedColor";
import {
  CanvasWrapper,
  ColorCodeWrapper,
  ColorCursor,
  ColorPickerWrapper,
  DropperButton,
  Header,
  HoveredColorCodeText,
  SelectedColorCodeText,
} from "./ColorPicker.styles";
import { rgbToHex } from "../../helpers/color";
import throttle from "lodash/throttle";

const imageUrl = "/static/images/mountain-landscape.jpeg";
const DEFAULT_COLOR = "rgb(0,0,0)";

type CursorPosition = { x: number; y: number };

interface ColorPickerProps {
  onColorSelect?: (color: string) => void;
}

export const ColorPicker = ({ onColorSelect }: ColorPickerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
  const [hoveredColor, setHoveredColor] = useState(DEFAULT_COLOR);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
    null
  );
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvasRef.current = offscreenCanvas;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (!ctx || !offscreenCtx) return;

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const desiredWidth = 800;
      const aspectRatio = image.height / image.width;
      const desiredHeight = desiredWidth * aspectRatio;

      canvas.width = desiredWidth;
      canvas.height = desiredHeight;
      offscreenCanvas.width = desiredWidth;
      offscreenCanvas.height = desiredHeight;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      offscreenCtx.drawImage(
        image,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );
    };
  }, []);

  const updateCursorPosition = throttle((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setCursorPosition({ x, y });
  }, 150);

  const getColorAtPosition = (x: number, y: number) => {
    const offscreenCanvas = offscreenCanvasRef.current;
    if (!offscreenCanvas) return;

    const ctx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  };

  const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const color = getColorAtPosition(x, y);
    if (!color) return;

    setSelectedColor(color);
    onColorSelect?.(color);
  };

  const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateCursorPosition(e.clientX, e.clientY);

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const color = getColorAtPosition(x, y);
    if (!color) return;

    setHoveredColor(color);
  };

  return (
    <ColorPickerWrapper>
      <Header>
        <DropperButton>
          <IconColorPicker />
        </DropperButton>
        <SelectedColorCodeText
          style={{
            padding: "10px 10px",
          }}
        >
          {rgbToHex(selectedColor)}
        </SelectedColorCodeText>
      </Header>
      <CanvasWrapper>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          style={{
            cursor: "pointer",
            border: "1px solid #000",
          }}
        />
        {cursorPosition && (
          <ColorCursor
            style={{
              top: `${cursorPosition.y}px`,
              left: `${cursorPosition.x}px`,
            }}
          >
            <ColorCodeWrapper>
              <SelectedColor color={hoveredColor} />
              <HoveredColorCodeText>
                {rgbToHex(hoveredColor)}
              </HoveredColorCodeText>
            </ColorCodeWrapper>
          </ColorCursor>
        )}
      </CanvasWrapper>
    </ColorPickerWrapper>
  );
};
