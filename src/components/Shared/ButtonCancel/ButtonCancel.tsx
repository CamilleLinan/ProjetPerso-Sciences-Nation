import { FC } from 'react';
import "./_ButtonCancel.scss";

interface ButtonCancelProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
    text: string;
}

const ButtonCancel: FC<ButtonCancelProps> = ({ onClick, text }) => {
  return (
    <button className="btn-cancel" onClick={onClick}>
        <span>{text}</span>
    </button>
  );
};

export default ButtonCancel;