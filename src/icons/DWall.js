import React from "react";
import PropTypes from "prop-types";

function DWall(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "54"}
      height={props?.size || "54"}
      viewBox="0 0 54 54"
      style={{ width: "auto", height: "auto" }}
    >
      <defs>
        <linearGradient
          id="od044k02oa"
          x1="35.019%"
          x2="67.721%"
          y1="39.758%"
          y2="84.553%"
        >
          <stop offset="0%" stopColor="#FB6E00" />
          <stop offset="100%" stopColor="#FA3800" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g transform="translate(-1172 -962) translate(1083) translate(34 727) translate(22 29) translate(0 206) translate(33)">
                    <circle
                      cx="26.507"
                      cy="26.507"
                      r="26.507"
                      fill="url(#od044k02oa)"
                    />
                    <g fill="#FFF" fillRule="nonzero">
                      <path
                        d="M27.644 8.444c-.04-.863-.04-1.687-.04-2.51 0-.668-.51-1.178-1.176-1.178-4.904 0-8.63-1.412-11.73-4.432-.47-.432-1.176-.432-1.647 0-3.1 3.02-6.826 4.432-11.73 4.432-.666 0-1.176.51-1.176 1.177 0 .824 0 1.648-.04 2.51-.156 8.239-.392 19.537 13.377 24.283l.393.079.392-.079C27.997 27.98 27.8 16.721 27.644 8.444zm-14.71 11.415c-.236.197-.51.314-.825.314h-.039c-.314 0-.628-.157-.824-.392l-3.648-4.04 1.765-1.57 2.864 3.178 6.355-6.041 1.608 1.726-7.257 6.825z"
                        transform="translate(12.6 9.8)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

DWall.propTypes = {
  size: PropTypes.number,
};

export default DWall;
