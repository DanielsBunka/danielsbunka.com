// app/about/data.ts

export const SYSTEM_LOGS = [
    {
        id: "log_01",
        date: "2019.09",
        title: "Introduction to Coding: GCSE Computer Science",
        description: "This was the start of my coding and Computer Science journey, I picked up my first programming Language (Python) and developed the foundations of Computer Science."
    },
    {
        id: "log_02",
        date: "2022.09",
        title: "Further Education: A Level Computer Science",
        description: "Explored Computer Science concepts such as data structures, networking and cyber security whilst picking up my second programming language (Visual Basic)."
    },
    {
        id: "log_03",
        date: "2025.09",
        title: "Enrollment: BSc Computer Science, LJMU",
        description: "Started the journey towards getting a Computer Science Degree, and massively accelerating in experience and knowledge as well as deepening my passion for Computer Science and programming in general."
    },
    {
        id: "log_04",
        date: "2026.02",
        title: "Personal Project: SMS Assistant",
        description: "Started a personal project to create an SMS bot that I could message for train times, that expanded into a multi-purpose SMS Assistant as I added more features.",
        link: "/projects/sms-assistant"
    },
    {
        id: "log_05",
        date: "2026.02",
        title: "Personal Project: Roast My Face Web App",
        description: "Created and published a full-stack AI web application that turns image input into humourous roasts. This project helped me explore how to secure API keys from static webpages and utilizing serverless architecture.",
        link: "/projects/roast-my-face"
    },
    {
        id: "log_06",
        date: "2026.05",
        title: "Completion: First Year At LJMU",
        description: "Finished my first year at university with a First Class average (79%) and taking one more step towards a journey of developing my skills and improving myself as a Computer Scientist."
    },
    {
        id: "log_07",
        date: "2026.05",
        title: "Hackathon: BCS Merseyside 2026",
        description: "Collaborated with fellow Computer Science students during a two-day hackathon to design, prototype and present a smart-city transport solution under time pressure."
    },
    {
        id: "log_08",
        date: "2026.06",
        title: "Launching: danielsbunka.com",
        description: "Launching the current website that you are on to showcase my skills and portfolio to potential employers or anyone potentially interested in my Computer Science skills."
    },
    {
        id: "log_09",
        date: "ACTIVE",
        title: "Placement Search: 2027/2028 Cycle",
        description: "Actively looking for an industrial placement year to start by September 2027, to bring my skills to a workplace environment as well as develop as a software engineer."
    }
];

export const CORE_SPECS = [
    { label: "Location", value: "North West - UK" },
    { label: "Education", value: "LJMU [Comp Sci]" },
    { label: "Year 1 Result", value: "First Class" },
    { label: "Status", value: "Searching for Placement" }
];

export const LANGUAGE_STACK = [
    { skill: "Python", comfortable: true },
    { skill: "HTML / CSS", comfortable: true },
    { skill: "JavaScript", comfortable: true },
    { skill: "TypeScript", comfortable: true },
    { skill: "Java", comfortable: false },
    { skill: "Visual Basic", comfortable: false },
    { skill: "SQL", comfortable: false }
];

export const INFRA_STACK = [
    { skill: "RESTful APIs", comfortable: true },
    { skill: "Flask", comfortable: false },
    { skill: "Next.js", comfortable: false },
    { skill: "React", comfortable: false },
    { skill: "Docker", comfortable: false },
    { skill: "Linux", comfortable: false },
    { skill: "Networking / Selfhosting", comfortable: false }
];
