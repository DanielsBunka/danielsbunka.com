"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    // --- CONTACT VARIABLES ---
    const emailAddress = "hello@danielsbunka.com";
    const linkedinUrl = "https://linkedin.com/in/daniels-bunka";
    const githubUrl = "https://github.com/DanielsBunka";
    const cvFileName = "Daniels_Bunka_CV.pdf";
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

            <div className="content-container" style={{ maxWidth: "600px", padding: "60px 24px", margin: "0 auto" }}>

                <h1 className="page-title">Get in Touch.</h1>
                <p className="page-subtitle" style={{ fontSize: "16px", marginBottom: "32px" }}>
                    I am actively seeking an industrial placement for the 2027/2028 cycle. My inbox is always open for opportunities, questions, or just to talk tech.
                </p>

                {/* CV ACTION BUTTONS */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "64px", flexWrap: "wrap" }}>
                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="terminal-link-btn" style={{ margin: 0, fontSize: "13px", padding: "10px 20px" }}>
                        [ View CV ]
                    </a>
                    <a href="/cv.pdf" download={cvFileName} className="terminal-link-btn" style={{ margin: 0, fontSize: "13px", padding: "10px 20px" }}>
                        [ Download PDF ]
                    </a>
                </div>

                {/* VERTICAL CONTACT LINKS */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                    {/* Email Block (Click to Copy) */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid var(--border-medium)" }}>
                        <div>
                            <div className="section-heading-terminal" style={{ border: "none", margin: 0, padding: 0 }}>[ EMAIL ]</div>
                            <div style={{ color: "var(--ink-charcoal)", fontSize: "14px", marginTop: "4px" }}>
                                {emailAddress}
                            </div>
                        </div>
                        <button
                            onClick={handleCopyEmail}
                            className="terminal-link-btn"
                            style={{
                                margin: 0,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                border: "none",
                                width: "120px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <span style={{
                                display: "inline-block",
                                transform: copied ? "scale(0.92)" : "scale(1)", /* Creates a tactile 'press down' effect */
                                transition: "transform 0.15s ease" /* Fast, snappy, and perfectly sharp */
                            }}>
                                {copied ? "[ Copied! ]" : "[ Copy Email ]"}
                            </span>
                        </button>
                    </div>

                    {/* LinkedIn Block */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid var(--border-medium)" }}>
                        <div>
                            <div className="section-heading-terminal" style={{ border: "none", margin: 0, padding: 0 }}>[ LINKEDIN ]</div>
                            <div style={{ color: "var(--ink-charcoal)", fontSize: "14px", marginTop: "4px" }}>Professional network.</div>
                        </div>
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="terminal-link-btn" style={{ margin: 0 }}>
                            [ Connect ]
                        </a>
                    </div>

                    {/* GitHub Block */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid var(--border-medium)" }}>
                        <div>
                            <div className="section-heading-terminal" style={{ border: "none", margin: 0, padding: 0 }}>[ GITHUB ]</div>
                            <div style={{ color: "var(--ink-charcoal)", fontSize: "14px", marginTop: "4px" }}>View my source code.</div>
                        </div>
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="terminal-link-btn" style={{ margin: 0 }}>
                            [ Follow ]
                        </a>
                    </div>

                </div>

            </div>
        </main>
    );
}