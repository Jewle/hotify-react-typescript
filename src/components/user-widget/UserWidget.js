import React from "react";
import './user-widget.scss'
export default function UserWidget () {
    return (
        <div className="account-actions-wrapper">
            <div className="account-actions">
                <div className="account-item account-ava">
                    <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2101291776797138&height=300&width=300&ext=1645430098&hash=AeSuh2V06bSP_JNsyEw" alt=""/>
                </div>
                <p className=" account-item account-name">Artyom Chizhov</p>
                <button className="account-item">

                    {/*<svg role="img" height="16" width="16" className="Svg-sc-1bi12j5-0 hDgDGI eAXFT6yvz37fvS1lmt6k"*/}
                    {/*     viewBox="0 0 16 16">*/}
                    {/*    <path d="M3 6l5 5.794L13 6z"></path>*/}
                    {/*</svg>*/}
                </button>
            </div>
        </div>

    )
}
