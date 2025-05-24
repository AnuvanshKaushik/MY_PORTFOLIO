// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize skill bars
  const progressBars = document.querySelectorAll(".progress-line span")
  progressBars.forEach((bar) => {
    const percent = bar.getAttribute("data-percent")
    bar.style.width = percent
  })

  // Initialize skill circles
  const circles = [
    { id: "number1", percent: 90 },
    { id: "number2", percent: 85 },
    { id: "number3", percent: 80 },
    { id: "number4", percent: 75 },
    { id: "number5", percent: 80 },
    { id: "number6", percent: 75 },
  ]

  circles.forEach((circle) => {
    const element = document.getElementById(circle.id)
    if (element) {
      element.textContent = `${circle.percent}%`
    }
  })

  // Typing effect
  const typingElement = document.querySelector(".typing")
  const words = ["Web Developer", "Software Engineer", "Software Tester", "Data Analyst"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  const isEnd = false

  function type() {
    const currentWord = words[wordIndex]
    const currentChar = currentWord.substring(0, charIndex)
    typingElement.textContent = currentChar

    if (!isDeleting && charIndex < currentWord.length) {
      // Type the word
      charIndex++
      setTimeout(type, 100)
    } else if (isDeleting && charIndex > 0) {
      // Delete the word
      charIndex--
      setTimeout(type, 50)
    } else {
      // Switch to next word
      isDeleting = !isDeleting
      if (isDeleting) {
        setTimeout(type, 1000) // Pause before deleting
      } else {
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(type, 500) // Pause before typing next word
      }
    }
  }

  // Start typing effect
  type()

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    body.classList.remove("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }

  themeToggle.addEventListener("click", () => {
    // Toggle dark theme class
    body.classList.toggle("dark-theme")

    // Update icon and save preference
    if (body.classList.contains("dark-theme")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      localStorage.setItem("theme", "dark")
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      localStorage.setItem("theme", "light")
    }
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")

    if (hamburger.classList.contains("active")) {
      hamburger.querySelector("span:nth-child(1)").style.transform = "rotate(45deg) translate(5px, 6px)"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "0"
      hamburger.querySelector("span:nth-child(3)").style.transform = "rotate(-45deg) translate(5px, -6px)"
    } else {
      hamburger.querySelector("span:nth-child(1)").style.transform = "none"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
      hamburger.querySelector("span:nth-child(3)").style.transform = "none"
    }
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      hamburger.classList.remove("active")
      hamburger.querySelector("span:nth-child(1)").style.transform = "none"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
      hamburger.querySelector("span:nth-child(3)").style.transform = "none"
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("active")
    } else {
      scrollToTopBtn.classList.remove("active")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Project filtering with animation
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectItemsFiltered = document.querySelectorAll(".project-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filterValue = btn.getAttribute("data-filter")

      projectItemsFiltered.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 200)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 200)
        }
      })
    })
  })

  // Skill progress bars animation
  const skillsSection = document.querySelector(".skills")
  let skillsAnimated = false

  window.addEventListener("scroll", () => {
    if (!skillsAnimated && isElementInViewport(skillsSection)) {
      animateSkills()
      skillsAnimated = true
    }
  })

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Animate skills when they come into view
  function animateSkills() {
    const progressBars = document.querySelectorAll(".progress-line span")
    progressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent")
      bar.style.width = percent

      // Add percentage text after the bar
      bar.setAttribute("data-after", percent)
    })

    const skillCircles = document.querySelectorAll(".skill-circle")
    skillCircles.forEach((circle, index) => {
      // Get the correct number element based on its ID
      const numberElement = circle.querySelector(".inner-circle div")
      if (!numberElement) return

      const percentText = numberElement.textContent
      const percent = Number.parseInt(percentText)
      if (isNaN(percent)) return

      // Animate the percentage number when in viewport
      let counter = 0
      const interval = setInterval(() => {
        if (counter >= percent) {
          clearInterval(interval)
        } else {
          counter += 1
          numberElement.textContent = counter + "%"
        }
      }, 20)

      // Style the outer circle with gradient based on percentage
      const outerCircle = circle.querySelector(".outer-circle")
      outerCircle.style.background = `conic-gradient(var(--primary-color) ${percent * 3.6}deg, var(--light-color) 0deg)`
    })
  }

  // Form submission with validation
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it to console
      console.log({
        name,
        email,
        subject,
        message,
      })

      // Show success message with animation
      const formElements = contactForm.elements
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true
      }

      const successMessage = document.createElement("div")
      successMessage.className = "success-message"
      successMessage.innerHTML = `
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for your message, ${name}! I will get back to you soon.</p>
      `
      contactForm.innerHTML = ""
      contactForm.appendChild(successMessage)

      // Reset form after 5 seconds
      setTimeout(() => {
        contactForm.innerHTML = `
          <div class="input-row">
            <div class="input-group">
              <input type="text" id="name" required>
              <label for="name">Your Name</label>
            </div>
            <div class="input-group">
              <input type="email" id="email" required>
              <label for="email">Your Email</label>
            </div>
          </div>
          <div class="input-group">
            <input type="text" id="subject" required>
            <label for="subject">Subject</label>
          </div>
          <div class="input-group">
            <textarea id="message" rows="5" required></textarea>
            <label for="message">Your Message</label>
          </div>
          <button type="submit" class="btn primary-btn">Send Message</button>
        `
      }, 5000)
    })
  }

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Project Modal Functionality
  const projectItems = document.querySelectorAll(".project-item")
  const projectModal = document.querySelector(".project-modal")
  const modalContent = document.querySelector(".modal-content")
  const closeModal = document.querySelector(".close-modal")
  const modalTitle = document.querySelector(".modal-title")
  const modalCategory = document.querySelector(".modal-category")
  const modalDescription = document.querySelector(".modal-description")
  const techStack = document.querySelector(".tech-stack")
  const galleryMain = document.querySelector(".gallery-main img")
  const galleryThumbs = document.querySelector(".gallery-thumbs")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const modalLinks = document.querySelector(".modal-links")

  // Project data
  const projectsData = [
    {
      id: 1,
      title: "AI Image Generator",
      category: "Web Development",
      description:
        "I developed an AI-powered image generation web application that leverages OpenAI's API to create unique images based on user prompts. The app features seamless API integration through a responsive React front-end and a robust Node.js/Express back-end. To enhance performance and user experience, I integrated Cloudinary for efficient image storage, optimization, and fast delivery.",
      technologies: ["Express", "React", "Node.js", "MongoDB", "Open Ai API"],
      images: [
        "/ProjectCoverImage/Aiimagegencover.png",
        "/ProjectCoverImage/Aiimagegen1.png",
        "/ProjectCoverImage/Aiimagegen2.png",
        "/ProjectCoverImage/Aiimagegen3.png",
      ],
      liveUrl: "https://ai-image-generator-mern.vercel.app/",
      githubUrl: "https://github.com/AnuvanshKaushik/IMAGE_GENERATOR",
    },
    {
      id: 2,
      title: "Stock Prediction Analysis",
      category: "Data Science",
      description:
        "I developed a stock price prediction model using Long Short-Term Memory (LSTM) neural networks to forecast future stock prices based on historical data. The project includes data preprocessing, model training, and visualization of predictions. The model analyzes patterns in historical stock data to make informed predictions about future price movements.",
      technologies: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib"],
      images: [
        "/ProjectCoverImage/StockCover.png",
        "/ProjectCoverImage/Stock1.png",
        "/ProjectCoverImage/Stock2.png",
        "/ProjectCoverImage/Stock3.png",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/AnuvanshKaushik/Stock_Prediction_App",
    },
    {
      id: 3,
      title: "Sales Prediction Analysis",
      category: "Data Science",
      description:
        "Stock Prediction Analysis is a web-based application that forecasts stock prices using a machine learning approach. The frontend is built with HTML, CSS, and JavaScript, providing a clean and interactive user interface. The backend is developed using Flask, which handles user input and communicates with a trained Random Forest model. This model, saved using Pickle, analyzes historical stock data to make accurate predictions. The application allows users to input relevant stock parameters and instantly receive predicted stock prices, offering a practical demonstration of data-driven financial forecasting.",
      technologies: ["Python", "sklearn", "Pandas", "NumPy", "Matplotlib","Flask","HTML", "CSS", "JavaScript"],
      images: [
        "/ProjectCoverImage/Sale1.png",
        "/ProjectCoverImage/Sale2.png",
        "/ProjectCoverImage/Sale2.png",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/AnuvanshKaushik/SALES_PREDICTION",
    },
    {
      id: 4,
      title: "Whether Forecasting App",
      category: "Web Development",
      description:
        "I developed a weather forecasting app using HTML, CSS, and JavaScript. The app allows users to search for any city and get real-time weather updates. It displays temperature, humidity, wind speed, and weather conditions in a clean and responsive interface. API integration ensures accurate and up-to-date data. This project showcases my front-end development skills and API handling in JavaScript.",
      technologies: ["HTML", "CSS", "JavaScript","Api Integration"],
      images: [
        "/ProjectCoverImage/Whether1.png",
        "/ProjectCoverImage/Whether2.png",  
        "/ProjectCoverImage/Whether3.png",
        "/ProjectCoverImage/Whether4.png",
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/AnuvanshKaushik/Whether_Forecasting",
    },
  ]

  let currentImageIndex = 0
  let currentProject = null

  // Make sure all project items have the correct data-id attribute
  projectItems.forEach((item, index) => {
    // If data-id is missing or doesn't match the index+1, set it
    if (!item.getAttribute("data-id") || Number.parseInt(item.getAttribute("data-id")) !== index + 1) {
      item.setAttribute("data-id", (index + 1).toString())
    }
  })

  // Open modal when clicking on a project
  projectItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Prevent opening if clicking on project links
      if (e.target.closest(".project-links a")) {
        return
      }

      const projectId = Number.parseInt(item.getAttribute("data-id"))
      const project = projectsData.find((p) => p.id === projectId)

      if (project) {
        currentProject = project
        openProjectModal(project)
      } else {
        console.error("Project not found for ID:", projectId)
      }
    })
  })

  // Open project modal
  function openProjectModal(project) {
    // Set modal content
    modalTitle.textContent = project.title
    modalCategory.textContent = project.category
    modalDescription.textContent = project.description

    // Set technologies
    techStack.innerHTML = ""
    project.technologies.forEach((tech) => {
      const techTag = document.createElement("span")
      techTag.className = "tech-tag"
      techTag.textContent = tech
      techStack.appendChild(techTag)
    })

    // Set links
    modalLinks.innerHTML = ""

    if (project.liveUrl && project.liveUrl !== "#") {
      const liveLinkElement = document.createElement("a")
      liveLinkElement.href = project.liveUrl
      liveLinkElement.target = "_blank"
      liveLinkElement.className = "btn primary-btn live-link"
      liveLinkElement.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo'
      modalLinks.appendChild(liveLinkElement)
    }

    if (project.githubUrl && project.githubUrl !== "#") {
      const githubLinkElement = document.createElement("a")
      githubLinkElement.href = project.githubUrl
      githubLinkElement.target = "_blank"
      githubLinkElement.className = "btn secondary-btn github-link"
      githubLinkElement.innerHTML = '<i class="fab fa-github"></i> View Code'
      modalLinks.appendChild(githubLinkElement)
    }

    // Set images
    currentImageIndex = 0
    updateGalleryImage()

    // Create thumbnails
    galleryThumbs.innerHTML = ""
    project.images.forEach((img, index) => {
      const thumbItem = document.createElement("div")
      thumbItem.className = `thumb-item ${index === 0 ? "active" : ""}`
      thumbItem.innerHTML = `<img src="${img}" alt="Thumbnail ${index + 1}">`
      thumbItem.addEventListener("click", () => {
        currentImageIndex = index
        updateGalleryImage()
      })
      galleryThumbs.appendChild(thumbItem)
    })

    // Show modal
    projectModal.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling

    // Update navigation buttons
    updateNavButtons()
  }

  // Close modal
  function closeProjectModal() {
    projectModal.classList.remove("active")
    document.body.style.overflow = "" // Restore scrolling
  }

  // Update gallery image
  function updateGalleryImage() {
    if (!currentProject) return

    galleryMain.src = currentProject.images[currentImageIndex]
    galleryMain.alt = `${currentProject.title} - Image ${currentImageIndex + 1}`

    // Update thumbnails
    document.querySelectorAll(".thumb-item").forEach((thumb, index) => {
      if (index === currentImageIndex) {
        thumb.classList.add("active")
      } else {
        thumb.classList.remove("active")
      }
    })

    // Update navigation buttons
    updateNavButtons()
  }

  // Update navigation buttons
  function updateNavButtons() {
    if (!currentProject) return

    // Hide prev button if on first image
    if (currentImageIndex === 0) {
      prevBtn.style.opacity = "0.5"
      prevBtn.style.pointerEvents = "none"
    } else {
      prevBtn.style.opacity = "1"
      prevBtn.style.pointerEvents = "auto"
    }

    // Hide next button if on last image
    if (currentImageIndex === currentProject.images.length - 1) {
      nextBtn.style.opacity = "0.5"
      nextBtn.style.pointerEvents = "none"
    } else {
      nextBtn.style.opacity = "1"
      nextBtn.style.pointerEvents = "auto"
    }
  }

  // Previous image
  prevBtn.addEventListener("click", () => {
    if (currentImageIndex > 0) {
      currentImageIndex--
      updateGalleryImage()
    }
  })

  // Next image
  nextBtn.addEventListener("click", () => {
    if (currentProject && currentImageIndex < currentProject.images.length - 1) {
      currentImageIndex++
      updateGalleryImage()
    }
  })

  // Close modal when clicking on close button
  closeModal.addEventListener("click", closeProjectModal)

  // Close modal when clicking outside of modal content
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeProjectModal()
    }
  })

  // Close modal when pressing ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeProjectModal()
    }
  })

  // Keyboard navigation for gallery
  document.addEventListener("keydown", (e) => {
    if (!projectModal.classList.contains("active")) return

    if (e.key === "ArrowLeft" && currentImageIndex > 0) {
      currentImageIndex--
      updateGalleryImage()
    } else if (e.key === "ArrowRight" && currentProject && currentImageIndex < currentProject.images.length - 1) {
      currentImageIndex++
      updateGalleryImage()
    }
  })

  // Add CSS class for success message
  const style = document.createElement("style")
  style.textContent = `
    .success-message {
      text-align: center;
      padding: 30px;
      animation: fadeIn 0.5s ease;
    }
    
    .success-icon {
      font-size: 4rem;
      color: #4CAF50;
      margin-bottom: 20px;
    }
    
    .success-message h3 {
      font-size: 1.8rem;
      margin-bottom: 15px;
      color: var(--primary-color);
    }
    
    .success-message p {
      font-size: 1.1rem;
      color: var(--text-light);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
  document.head.appendChild(style)

  // Check for image errors and replace with placeholders if needed
  function handleImageErrors() {
    const allImages = document.querySelectorAll('img:not([src^="data:"])')
    
    allImages.forEach(img => {
      img.addEventListener('error', function() {
        // Replace with placeholder if image fails to load
        this.src = `/placeholder.svg?height=${this.height || 300}&width=${this.width || 400}`
        this.alt = 'Image placeholder'
      })
    })
  }
  
  // Call the function to handle image errors
  handleImageErrors()

  // Update footer copyright year
  const footerYear = document.querySelector('footer .footer-content p')
  if (footerYear) {
    const currentYear = new Date().getFullYear()
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear)
  }
})
