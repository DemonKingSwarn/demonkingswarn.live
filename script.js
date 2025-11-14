document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    loadProjects();
    loadTypewriter();
    loadTechStack();
});

async function loadContacts() {
    const response = await fetch('data/contacts.json');
    const contacts = await response.json();

    const contactLinks = document.getElementById('contact-links');
    for (const [key, value] of Object.entries(contacts)) {
        const a = document.createElement('a');
        a.href = value;
        a.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        a.target = '_blank';
        contactLinks.appendChild(a);
    }
}

async function loadProjects() {
    const response = await fetch('data/projects.json');
    const projects = await response.json();

    const projectsContainer = document.getElementById('projects-container');
    for (const project of projects) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const title = document.createElement('h3');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        const link = document.createElement('a');
        link.href = project.link;
        link.textContent = 'View Project';
        link.target = '_blank';

        projectDiv.appendChild(title);
        projectDiv.appendChild(description);
        projectDiv.appendChild(link);

        projectsContainer.appendChild(projectDiv);
    }
}

function isHindi(text) {
    return /[\u0900-\u097F]/.test(text);
}

async function loadTypewriter() {
    const response = await fetch('data/translations.json');
    const data = await response.json();
    const names = data.names;
    const typewriterElement = document.getElementById('typewriter');
    let nameIndex = 0;

    function setFontForLanguage(name) {
        if (isHindi(name)) {
            typewriterElement.style.fontFamily = "'Akshar', sans-serif";
            typewriterElement.style.fontWeight = "300";
        } else {
            typewriterElement.style.fontFamily = "'Montserrat', sans-serif";
            typewriterElement.style.fontWeight = "700"; // Default for Montserrat
        }
    }

    function type(name, index) {
        if (index === 0) { // Set font only once at the beginning of typing a new name
            setFontForLanguage(name);
        }
        if (index < name.length) {
            typewriterElement.textContent += name.charAt(index);
            setTimeout(() => type(name, index + 1), 150);
        } else {
            setTimeout(deleteText, 1000);
        }
    }

    function deleteText() {
        const text = typewriterElement.textContent;
        if (text.length > 0) {
            typewriterElement.textContent = text.slice(0, -1);
            setTimeout(deleteText, 100);
        } else {
            nameIndex = (nameIndex + 1) % names.length;
            type(names[nameIndex], 0);
        }
    }

    type(names[nameIndex], 0);
}

async function loadTechStack() {
    const response = await fetch('data/tech_stack.json');
    const techStack = await response.json();

    const techStackContainer = document.getElementById('tech-stack-container');
    for (const category in techStack) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('tech-category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;

        const techList = document.createElement('ul');
        for (const tech of techStack[category]) {
            const techItem = document.createElement('li');
            techItem.textContent = tech;
            techList.appendChild(techItem);
        }

        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(techList);
        techStackContainer.appendChild(categoryDiv);
    }
}
