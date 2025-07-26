
        // Page Navigation System
        let currentPage = 'home';

        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                currentPage = pageId;
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Initialize page-specific content
                initializePage(pageId);
            }
        }

        function initializePage(pageId) {
            switch(pageId) {
                case 'sermones':
                    loadSermons();
                    break;
                case 'eventos':
                    loadCalendar();
                    loadUpcomingEvents();
                    break;
                case 'home':
                    initTestimonialCarousel();
                    break;
            }
        }

        // Mobile Menu
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('translate-x-full');
        }

        // Sermon functionality
        function loadSermons() {
            const sermons = [
                {
                    id: 1,
                    title: "Fe que Transforma",
                    description: "Descubre cómo la fe puede cambiar completamente tu perspectiva de vida y abrir nuevas posibilidades.",
                    series: "fe",
                    date: "2024-03-10",
                    duration: "45 min"
                },
                {
                    id: 2,
                    title: "Amor Incondicional",
                    description: "El mensaje de amor de Dios que no depende de nuestras circunstancias ni desempeño.",
                    series: "fe",
                    date: "2024-03-03",
                    duration: "42 min"
                },
                {
                    id: 3,
                    title: "Propósito Divino",
                    description: "Encuentra tu llamado y propósito en el plan perfecto de Dios para tu vida.",
                    series: "proposito",
                    date: "2024-02-25",
                    duration: "38 min"
                },
                {
                    id: 4,
                    title: "Familia Bendecida",
                    description: "Principios bíblicos para construir una familia sólida y llena de bendiciones.",
                    series: "familia",
                    date: "2024-02-18",
                    duration: "41 min"
                },
                {
                    id: 5,
                    title: "Esperanza Renovada",
                    description: "Cuando las circunstancias son difíciles, Dios restaura nuestra esperanza.",
                    series: "fe",
                    date: "2024-02-11",
                    duration: "36 min"
                },
                {
                    id: 6,
                    title: "Generosidad que Libera",
                    description: "El poder transformador de dar y cómo la generosidad nos libera.",
                    series: "proposito",
                    date: "2024-02-04",
                    duration: "43 min"
                }
            ];

            const sermonGrid = document.getElementById('sermonGrid');
            sermonGrid.innerHTML = '';

            sermons.forEach(sermon => {
                const sermonCard = `
                    <div class="card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div class="video-container bg-gray-200">
                            <div class="flex items-center justify-center h-full cursor-pointer" onclick="playSermon(${sermon.id})">
                                <i class="fas fa-play-circle text-6xl text-orange-500"></i>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs font-semibold text-orange-500 uppercase tracking-wide">${getSeriesName(sermon.series)}</span>
                                <span class="text-xs text-gray-500">${sermon.duration}</span>
                            </div>
                            <h3 class="text-xl font-bold mb-2 text-gray-900">${sermon.title}</h3>
                            <p class="text-gray-600 mb-4">${sermon.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-500">${formatDate(sermon.date)}</span>
                                <button onclick="playSermon(${sermon.id})" class="btn-primary px-4 py-2 rounded-lg text-white font-semibold text-sm">
                                    Ver sermón
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                sermonGrid.innerHTML += sermonCard;
            });
        }

        function getSeriesName(series) {
            const seriesNames = {
                'fe': 'Fe y Esperanza',
                'familia': 'Vida Familiar',
                'proposito': 'Propósito'
            };
            return seriesNames[series] || 'General';
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        function playSermon(sermonId) {
            alert(`Reproduciendo sermón ${sermonId}. En una implementación real, esto abriría el reproductor de video.`);
        }

        // Calendar functionality
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        function loadCalendar() {
            const calendar = document.getElementById('calendar');
            const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDay = firstDay.getDay();

            let calendarHTML = `
                <div class="col-span-7 text-center font-bold text-lg mb-4 text-gray-900">
                    ${monthNames[currentMonth]} ${currentYear}
                </div>
                <div class="col-span-7 grid grid-cols-7 gap-1 mb-2">
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Dom</div>
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Lun</div>
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Mar</div>
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Mié</div>
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Jue</div>
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Vie</div>
                    <div class="calendar-day font-semibold text-gray-600 bg-gray-50">Sáb</div>
                </div>
            `;

            // Empty days before the first day of the month
            for (let i = 0; i < startingDay; i++) {
                calendarHTML += '<div class="calendar-day text-gray-300"></div>';
            }

            // Days of the month
            const events = getEventsForMonth(currentMonth, currentYear);
            
            for (let day = 1; day <= daysInMonth; day++) {
                const hasEvent = events.some(event => event.day === day);
                const dayClass = hasEvent ? 'calendar-day has-event' : 'calendar-day hover:bg-orange-100';
                calendarHTML += `<div class="${dayClass}" onclick="selectDate(${day})">${day}</div>`;
            }

            calendar.innerHTML = calendarHTML;
        }

        function getEventsForMonth(month, year) {
            // Eventos de ejemplo
            const events = [
                { day: 15, title: 'Retiro de Parejas', type: 'retiro' },
                { day: 22, title: 'Conferencia Juvenil', type: 'conferencia' },
                { day: 8, title: 'Almuerzo Comunitario', type: 'social' },
                { day: 29, title: 'Bautismos', type: 'especial' }
            ];
            return events;
        }

        function selectDate(day) {
            alert(`Eventos para el ${day} de ${currentMonth + 1}/${currentYear}`);
        }

        function previousMonth() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            loadCalendar();
        }

        function nextMonth() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            loadCalendar();
        }

        function loadUpcomingEvents() {
            const events = [
                {
                    title: 'Retiro de Parejas',
                    date: '15-17 Marzo',
                    time: 'Todo el fin de semana',
                    type: 'retiro',
                    icon: 'fa-heart'
                },
                {
                    title: 'Conferencia Juvenil',
                    date: '22 Marzo',
                    time: '7:00 PM',
                    type: 'conferencia',
                    icon: 'fa-users'
                },
                {
                    title: 'Almuerzo Comunitario',
                    date: '8 Marzo',
                    time: '12:30 PM',
                    type: 'social',
                    icon: 'fa-utensils'
                },
                {
                    title: 'Bautismos',
                    date: '29 Marzo',
                    time: '10:00 AM',
                    type: 'especial',
                    icon: 'fa-water'
                }
            ];

            const eventsContainer = document.getElementById('upcomingEvents');
            eventsContainer.innerHTML = '';

            events.forEach(event => {
                const eventCard = `
                    <div class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer" onclick="registerForEvent('${event.title}')">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas ${event.icon} text-orange-500"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-900">${event.title}</h4>
                            <p class="text-gray-600 text-sm">${event.date} • ${event.time}</p>
                        </div>
                        <i class="fas fa-chevron-right text-gray-400"></i>
                    </div>
                `;
                eventsContainer.innerHTML += eventCard;
            });
        }

        function registerForEvent(eventTitle) {
            alert(`Registrándote para: ${eventTitle}`);
        }

        // Donation functionality
        function setAmount(amount) {
            document.getElementById('donationAmount').value = amount;
        }

        // Form handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Donation form handler
            const donationForm = document.getElementById('donationForm');
            if (donationForm) {
                donationForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);
                    const amount = formData.get('amount') || document.getElementById('donationAmount').value;
                    const type = formData.get('donationType');
                    
                    if (!amount || amount <= 0) {
                        alert('Por favor ingresa una cantidad válida');
                        return;
                    }
                    
                    alert(`Procesando donación de $${amount} para ${type}. En una implementación real, esto redirigiría a un procesador de pagos seguro.`);
                });
            }

            // Contact form handler
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);
                    const firstName = formData.get('firstName');
                    const email = formData.get('email');
                    
                    if (!firstName || !email) {
                        alert('Por favor completa los campos obligatorios');
                        return;
                    }
                    
                    alert(`Gracias ${firstName}! Tu mensaje ha sido enviado. Te contactaremos pronto.`);
                    this.reset();
                });
            }

            // Newcomer form handler
            const newcomerForm = document.getElementById('newcomerForm');
            if (newcomerForm) {
                newcomerForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);
                    const firstName = formData.get('firstName');
                    const email = formData.get('email');
                    
                    if (!firstName || !email) {
                        alert('Por favor completa tu nombre y email');
                        return;
                    }
                    
                    alert(`¡Bienvenido ${firstName}! Hemos recibido tu información y pronto alguien de nuestro equipo se pondrá en contacto contigo.`);
                    this.reset();
                });
            }

            // Newsletter form handler
            const newsletterForm = document.getElementById('newsletterForm');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);
                    const email = formData.get('email');
                    
                    if (!email) {
                        alert('Por favor ingresa tu email');
                        return;
                    }
                    
                    alert('¡Gracias por suscribirte! Recibirás nuestro newsletter semanal.');
                    closeNewsletterModal();
                    this.reset();
                });
            }

            // Show newsletter modal after some time
            setTimeout(showNewsletterModal, 30000); // 30 seconds
        });

        // Testimonial carousel
        function initTestimonialCarousel() {
            const testimonials = [
                {
                    quote: "Esta iglesia cambió mi vida. Encontré no solo fe, sino una familia que me ama incondicionalmente.",
                    author: "María González",
                    role: "Miembro desde 2019"
                },
                {
                    quote: "Los pastores realmente se preocupan por cada persona. He crecido tanto espiritualmente aquí.",
                    author: "Carlos Rodríguez",
                    role: "Miembro desde 2021"
                },
                {
                    quote: "Mi familia y yo encontramos propósito y comunidad. Nuestros hijos aman venir los domingos.",
                    author: "Ana Martínez",
                    role: "Miembro desde 2018"
                }
            ];

            let currentTestimonial = 0;
            const carousel = document.getElementById('testimonialCarousel');

            function showTestimonial(index) {
                const testimonial = testimonials[index];
                carousel.innerHTML = `
                    <div class="testimonial-slide text-center animate-fade-in">
                        <blockquote class="text-2xl mb-8 italic">
                            "${testimonial.quote}"
                        </blockquote>
                        <div class="flex items-center justify-center">
                            <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-user text-white text-xl"></i>
                            </div>
                            <div>
                                <p class="font-semibold">${testimonial.author}</p>
                                <p class="text-gray-400">${testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Auto-rotate testimonials
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);

            // Show first testimonial
            showTestimonial(0);
        }

        // Newsletter modal
        function showNewsletterModal() {
            document.getElementById('newsletterModal').classList.remove('hidden');
            document.getElementById('newsletterModal').classList.add('flex');
        }

        function closeNewsletterModal() {
            document.getElementById('newsletterModal').classList.add('hidden');
            document.getElementById('newsletterModal').classList.remove('flex');
        }

        // Initialize homepage
        document.addEventListener('DOMContentLoaded', function() {
            initTestimonialCarousel();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add loading states for buttons
        function addLoadingState(button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Procesando...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }

        // Enhanced form validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            const re = /^[\+]?[1-9][\d]{0,15}$/;
            return re.test(phone.replace(/\s/g, ''));
        }

        // Search functionality for sermons
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('sermonSearch');
            const filterSelect = document.getElementById('sermonFilter');
            
            if (searchInput && filterSelect) {
                searchInput.addEventListener('input', filterSermons);
                filterSelect.addEventListener('change', filterSermons);
            }
        });

        function filterSermons() {
            const searchTerm = document.getElementById('sermonSearch').value.toLowerCase();
            const filterValue = document.getElementById('sermonFilter').value;
            const sermonCards = document.querySelectorAll('#sermonGrid .card-hover');
            
            sermonCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const series = card.querySelector('.text-orange-500').textContent.toLowerCase();
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesFilter = filterValue === 'all' || series.includes(getSeriesName(filterValue).toLowerCase());
                
                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Location search functionality
        function searchLocation() {
            const searchTerm = document.getElementById('locationSearch').value;
            if (searchTerm.trim()) {
                alert(`Buscando iglesias cerca de: ${searchTerm}`);
            }
        }

        // Accessibility enhancements
        document.addEventListener('keydown', function(e) {
            // ESC key closes modals
            if (e.key === 'Escape') {
                closeNewsletterModal();
                toggleMobileMenu(); // Close if open
            }
            
            // Enter key on focusable elements
            if (e.key === 'Enter' && e.target.classList.contains('calendar-day')) {
                e.target.click();
            }
        });

        // Add focus management for better accessibility
        function trapFocus(element) {
            const focusableElements = element.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            element.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }

        // Initialize focus trapping for modals
        document.addEventListener('DOMContentLoaded', function() {
            const newsletter = document.getElementById('newsletterModal');
            if (newsletter) {
                trapFocus(newsletter);
            }
        });

        console.log('🎉 Iglesia Cristiana Moderna - Sitio web completamente funcional cargado exitosamente!');
