import React from "react";
import PropTypes from "prop-types";

function ShieldIconGrey(props) {
  return (
    <svg  viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <defs>
        <linearGradient x1="35.019%" y1="39.758%" x2="67.721%" y2="84.553%" id="a">
            <stop stop-color="#688FBD" offset="0%"/>
            <stop stop-color="#30598A" offset="100%"/>
        </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
        <circle fill="url(#a)" cx="14.726" cy="14.726" r="14.726"/>
        <path d="M22.358 10.136c-.022-.48-.022-.938-.022-1.395a.642.642 0 0 0-.654-.654c-2.724 0-4.795-.785-6.516-2.463a.672.672 0 0 0-.916 0c-1.721 1.678-3.792 2.463-6.516 2.463a.642.642 0 0 0-.654.654c0 .457 0 .915-.021 1.395-.088 4.576-.218 10.853 7.431 13.49l.218.043.218-.043c7.628-2.637 7.519-8.892 7.432-13.49zm-8.173 6.341a.703.703 0 0 1-.458.175h-.021a.613.613 0 0 1-.458-.218l-2.027-2.245.98-.872 1.592 1.766 3.53-3.357.894.96-4.032 3.791z" fill="#FFF" fill-rule="nonzero"/>
    </g>
</svg>

  );
}

ShieldIconGrey.propTypes = {
  size: PropTypes.number,
};

export default ShieldIconGrey;
