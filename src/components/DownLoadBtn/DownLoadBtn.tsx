import React, { useState } from 'react';
import downloadIcon from '../../images/Download.png';
import orangeDownl from '../../images/OrangeDownload.png';
import css from './DownLoadBtn.module.css';

type DownLoadBtnProps = {
  func: () => void,
}

const DownLoadBtn: React.FC<DownLoadBtnProps> = ({ func }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={css.imgWrap}
    >
      {isHovered ? (
        <img src={orangeDownl} alt="download" />
      ) : (
        <img src={downloadIcon} alt="download" />
      )}
    </div>
  );
};

export default DownLoadBtn;