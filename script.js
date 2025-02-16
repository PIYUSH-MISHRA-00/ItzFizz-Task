import gsap from "gsap"

document.addEventListener("DOMContentLoaded", () => {
  // GSAP Animations
  const tl = gsap.timeline()

  tl.from(".navbar", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
    .from(".hero-subtitle", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
    .from(".hero-cta", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
    .from(".image-container", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.7")

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Mouse movement effect on images
  const imageContainers = document.querySelectorAll(".image-container")

  imageContainers.forEach((container) => {
    container.addEventListener("mouseenter", () => {
      // Add active class to hovered container
      container.classList.add('active')
      
      // Remove active class from other containers
      imageContainers.forEach(otherContainer => {
        if (otherContainer !== container) {
          otherContainer.classList.remove('active')
        }
      })
    })

    container.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      gsap.to(container.querySelector("img"), {
        duration: 0.5,
        x: x * 20,
        y: y * 20,
        rotationY: x * 10,
        rotationX: -y * 10,
        ease: "power2.out",
      })
    })

    container.addEventListener("mouseleave", () => {
      gsap.to(container.querySelector("img"), {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
      })
      
      // Remove active class when mouse leaves
      container.classList.remove('active')
    })
  })
})
