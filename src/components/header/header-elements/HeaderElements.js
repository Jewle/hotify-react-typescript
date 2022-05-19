import UserWidget from "../../user-widget/UserWidget";
import React from "react";

export default function HeaderElements(){
    return (
        <div className='header-elements'>
            <div className="page-switcher">
                <button>
                    <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24"
                         className="Svg-ytk21e-0 dMCjEC IYDlXmBmmUKHveMzIPCF">
                        <polyline points="16 4 7 12 16 20" fill="none" stroke="#181818"></polyline>
                    </svg>
                </button>
                <button>
                    <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24"
                         className="Svg-ytk21e-0 dMCjEC IYDlXmBmmUKHveMzIPCF">
                        <polyline points="8 4 17 12 8 20" fill="none" stroke="#181818">
                        </polyline>
                    </svg>
                </button>
            </div>
            <UserWidget/>
        </div>
    )
}

