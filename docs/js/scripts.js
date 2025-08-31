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
            const contactItems = [
                {
                    icon: 'user',
                    label: 'Name',
                    value: contactInfo.name
                },
                {
                    icon: 'envelope',
                    label: 'Email',
                    value: `<a href="mailto:${contactInfo.email}" class="text-secondary hover:text-primary transition-colors">${contactInfo.email}</a>`
                },
                {
                    customIcon: `<div class="bg-[#0077b5] text-white p-2 rounded-lg hover:bg-[#006399] transition-colors group w-8 h-8 flex items-center justify-center">
                        <i class="fab fa-linkedin-in text-base group-hover:scale-110 transition-transform"></i>
                    </div>`,
                    label: 'LinkedIn',
                    value: `<a href="https://www.linkedin.com/in/${contactInfo.linkedin}" target="_blank" class="text-secondary hover:text-primary transition-colors">/${contactInfo.linkedin}</a>`
                },
                {
                    customIcon: `<div class="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors group w-8 h-8 flex items-center justify-center">
                        <i class="fab fa-github text-base group-hover:scale-110 transition-transform"></i>
                    </div>`,
                    label: 'GitHub',
                    value: `<a href="https://github.com/${contactInfo.github}" target="_blank" class="text-secondary hover:text-primary transition-colors">/${contactInfo.github}</a>`
                },
                {
                    icon: 'map-marker-alt',
                    label: 'Location',
                    value: contactInfo.location
                }
            ];

            contactInfoContent.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${contactItems.map(item => `
                        <div class="flex items-center space-x-4 p-3 rounded-lg bg-white shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                ${item.customIcon ? item.customIcon : `<i class="fas fa-${item.icon} text-primary"></i>`}
                            </div>
                            <div class="font-medium text-gray-700">${item.value}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Experience Section
            const experienceContent = document.getElementById('experience-content');
            
            // Agrupar experiencias por compañía
            const experienceByCompany = data.experience.reduce((acc, job) => {
                if (!acc[job.company]) {
                    acc[job.company] = [];
                }
                acc[job.company].push(job);
                return acc;
            }, {});

            let index = 0;
            for (const [company, jobs] of Object.entries(experienceByCompany)) {
                const companyElement = document.createElement('div');
                companyElement.className = 'relative pl-16 experience-item mb-8';

                // Timeline dot para la compañía
                const timelineDot = document.createElement('div');
                timelineDot.className = 'absolute left-0 w-12 h-12 bg-white rounded-full border-4 border-secondary flex items-center justify-center shadow-lg';
                timelineDot.innerHTML = '<i class="fas fa-building text-secondary"></i>';
                companyElement.appendChild(timelineDot);

                // Contenedor de la compañía
                const companyContent = document.createElement('div');
                companyContent.className = 'bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden';

                // Header de la compañía
                const companyHeader = document.createElement('div');
                companyHeader.className = 'bg-gradient-to-r from-primary to-secondary p-6 text-white';
                companyHeader.innerHTML = `
                    <h3 class="text-xl font-bold">${company}</h3>
                    ${jobs[0].companyDescription ? 
                      `<p class="text-white/80 mt-2">${jobs[0].companyDescription}</p>` : ''}
                `;
                companyContent.appendChild(companyHeader);

                // Contenedor de roles
                const rolesContainer = document.createElement('div');
                rolesContainer.className = 'divide-y divide-gray-100';

                jobs.forEach(job => {
                    const roleElement = document.createElement('div');
                    roleElement.className = 'p-6 hover:bg-gray-50 transition-colors';

                    roleElement.innerHTML = `
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h4 class="text-lg font-semibold text-gray-800">${job.title}</h4>
                            <div class="flex items-center space-x-2 text-sm text-gray-600">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${job.duration}</span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="flex items-center space-x-2 text-gray-600">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${job.location}</span>
                            </div>
                        </div>
                        <ul class="space-y-3 text-gray-600 mb-4">
                            ${job.responsibilities.map(resp => `
                                <li class="flex items-start space-x-3">
                                    <span class="text-secondary mt-1.5">•</span>
                                    <span class="flex-1">${resp}</span>
                                </li>
                            `).join('')}
                        </ul>
                    `;

                    rolesContainer.appendChild(roleElement);
                });

                companyContent.appendChild(rolesContainer);
                companyElement.appendChild(companyContent);

                // Animación
                companyElement.style.opacity = "0";
                companyElement.style.transform = "translateY(20px)";
                companyElement.style.animation = `fade-in 0.5s ease-out ${index * 0.3}s forwards`;

                experienceContent.appendChild(companyElement);
                index++;
            }

            // Education Section
            const educationContent = document.getElementById('education-content');
            
            // Sort education by date (most recent first)
            const sortedEducation = [...data.education].sort((a, b) => {
                const dateA = new Date(a.endDate || '9999');
                const dateB = new Date(b.endDate || '9999');
                return dateB - dateA;
            });

            sortedEducation.forEach((edu, index) => {
                const article = document.createElement('article');
                article.className = 'bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50';
                article.style.animation = `fade-in 0.5s ease-out ${index * 0.2}s forwards`;
                article.innerHTML = `
                    <div class="flex items-start space-x-4">
                        <div class="bg-primary/10 p-3 rounded-lg">
                            <i class="fas fa-${edu.institution.toLowerCase().includes('university') ? 'university' : 'certificate'} text-xl text-primary"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">${edu.institution}</h3>
                            <p class="text-secondary font-medium">${edu.details}</p>
                            <div class="flex items-center space-x-3 mt-2 text-sm text-gray-600">
                                <span class="flex items-center">
                                    <i class="fas fa-map-marker-alt mr-1"></i>
                                    ${edu.location}
                                </span>
                                <span class="flex items-center">
                                    <i class="fas fa-calendar-alt mr-1"></i>
                                    ${edu.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
                educationContent.appendChild(article);
            });

            // Languages Section
            const languagesContent = document.getElementById('languages-content');
            
            data.languages.forEach((lang, index) => {
                const article = document.createElement('article');
                article.className = 'flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50 flex-1 min-w-[200px]';
                article.style.animation = `fade-in 0.5s ease-out ${index * 0.2}s forwards`;
                
                article.innerHTML = `
                    <div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-language text-lg text-primary"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-800">${lang.name}</h3>
                            <span class="text-xs text-secondary font-medium bg-secondary/10 px-2 py-0.5 rounded">
                                ${lang.level}
                            </span>
                        </div>
                    </div>
                `;
                languagesContent.appendChild(article);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
