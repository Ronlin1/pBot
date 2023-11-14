import { FC } from "react";

interface Props {
  message: string;
}

const Status: FC<Props> = ({ message }) => {
  return (
    <div className="status">
      <div className="content">
        {message}
      </div>
    </div>
  );
}

export default Status;