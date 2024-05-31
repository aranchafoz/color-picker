import { styled } from "styled-components";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;

export const CanvasWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const ColorCursor = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);

  display: flex;
`;

export const ColorCodeWrapper = styled.div`
  position: relative;
`;

export const HoveredColorCodeText = styled.span`
  position: absolute;
  top: calc(50% + 12px);
  left: 50%;
  transform: translateX(-50%);

  background: #e9e9e9;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const SelectedColorCodeText = styled.span`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
`;

const BUTTON_SIZE = 36;

export const DropperButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #e9e9e9;
  border-radius: 50%;
  border: 0;

  height: ${BUTTON_SIZE}px;
  width: ${BUTTON_SIZE}px;
`;
