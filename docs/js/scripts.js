// Example: Smooth scroll to sections
document.querySelectorAll('li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('./data/cv.json')
        .then(response => response.json())
        .then(data => {
            // Contact Section
            const contactInfoContent = document.getElementById('contact-information-content');
            const contactInfo = data.contact_information;
            contactInfoContent.innerHTML = `
                <li><strong>Name:</strong> ${contactInfo.name}</li>
                <li><strong>Email:</strong> <a href="mailto:${contactInfo.email}">${contactInfo.email}</a></li>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/${contactInfo.linkedin}" target="_blank" rel="noopener noreferrer">/${contactInfo.linkedin}</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/${contactInfo.github}" target="_blank" rel="noopener noreferrer">/${contactInfo.github}</a></li>
                <li><strong>Location:</strong> ${contactInfo.location}</li>
            `;

            // Experience Section
            const experienceContent = document.getElementById('experience-content');
            data.experience.forEach(job => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h3>${job.title}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Duration:</strong> ${job.duration}</p>
                    <h4>Responsibilities:</h4>
                    <ul>
                        ${job.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}
                    </ul>
                `;
                experienceContent.appendChild(article);
            });

            // Education Section
            const educationContent = document.getElementById('education-content');
            data.education.forEach(edu => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h3>${edu.institution}</h3>
                    <p>${edu.details}, ${edu.location} | ${edu.duration}</p>
                `;
                educationContent.appendChild(article);
            });

            // Languages Section
            const languagesContent = document.getElementById('languages-content');
            data.languages.forEach(lang => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <p><strong>${lang.name}:</strong> ${lang.level}</p>
                `;
                languagesContent.appendChild(article);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});