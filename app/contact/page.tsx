"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    // --- CONTACT VARIABLES ---
    const emailAddress = "daniels.bunka8@gmail.com";
    const linkedinUrl = "https://linkedin.com/in/daniels-bunka-0b132530a";
    const githubUrl = "https://github.com/DanielsBunka";
    const cvFileName = "DanielsBunkaCV.pdf";
    // -------------------------

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="about-main">
            {/* MINIMAL TOP BAR */}
            <div className="top-nav-bar">
                <Link className="home-badge" href="/">DB</Link>
                <div className="nav-breadcrumb">
                    <span className="nav-divider">/</span>
                    <span className="nav-current">Contact</span>
                </div>
            </div>

            <div className="contact-container">
                <h1 className="page-title">Get in Touch.</h1>
                <p className="page-subtitle contact-subtitle">
                    I am actively seeking an industrial placement for the 2027/2028 cycle. My inbox is always open for opportunities, questions, or just to talk tech.
                </p>

                {/* CV ACTION BUTTONS */}
                <div className="contact-action-row">
                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="terminal-link-btn large">
                        [View CV]
                    </a>
                    <a href="/cv.pdf" download={cvFileName} className="terminal-link-btn large">
                        [Download CV]
                    </a>
                </div>

                {/* VERTICAL CONTACT LINKS */}
                <div className="contact-links-col">

                    {/* Email Block (Click to Copy) */}
                    <div className="contact-block">
                        <div>
                            <div className="contact-block-heading">[EMAIL]</div>
                            <div className="contact-block-desc">
                                {emailAddress}
                            </div>
                        </div>
                        <button onClick={handleCopyEmail} className="terminal-link-btn copy-email-btn">
                            <span className={`copy-email-text ${copied ? "pressed" : ""}`}>
                                {copied ? "[Copied!]" : "[Copy Email]"}
                            </span>
                        </button>
                    </div>

                    {/* LinkedIn Block */}
                    <div className="contact-block">
                        <div>
                            <div className="contact-block-heading">[LINKEDIN]</div>
                            <div className="contact-block-desc">Connect professionally</div>
                        </div>
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="terminal-link-btn no-margin">
                            [Connect]
                        </a>
                    </div>

                    {/* GitHub Block */}
                    <div className="contact-block">
                        <div>
                            <div className="contact-block-heading">[GITHUB]</div>
                            <div className="contact-block-desc">View my source code</div>
                        </div>
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="terminal-link-btn no-margin">
                            [View Code]
                        </a>
                    </div>

                </div>

            </div>
        </main>
    );
}