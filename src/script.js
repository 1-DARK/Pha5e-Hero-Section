import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements we need to animate
    const images = document.querySelectorAll('.animated-image');
    const texts = document.querySelectorAll('.animated-text');
    const overlay = document.querySelector('.overlay');
    const overlayText = document.querySelector('.overlay-text');

    // Create a GSAP timeline for the initial animation
    const tl = gsap.timeline();

    // Fade in images and texts after a 2-second delay
    tl.to(images, { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }, 2)
      .to(texts, { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }, 2.5);

    // Add click event listener to each image
    images.forEach(image => {
        image.addEventListener('click', () => {
            // Create a new timeline for the click animation
            const clickTl = gsap.timeline();

            // Animate out other images and all texts
            clickTl.to(images, { 
                opacity: (i, el) => el === image ? 1 : 0, 
                scale: (i, el) => el === image ? 1.5 : 0.5,
                duration: 0.5 
            })
            .to(texts, { opacity: 0, duration: 0.5 }, 0)
            .to(image, { 
                xPercent: -50, 
                yPercent: -50, 
                left: '50%', 
                top: '50%', 
                position: 'fixed',
                scale: 2,
                duration: 1 
            })
            .to(overlay, { opacity: 1, visibility: 'visible', duration: 0.5 })
            .to(overlayText, { opacity: 1, y: 0, duration: 0.5 });

            // Add click event to overlay to reverse the animation
            overlay.addEventListener('click', () => {
                clickTl.reverse().then(() => {
                    gsap.set(image, { clearProps: "all" }); // Clear all GSAP-added properties
                });
            }, { once: true }); // Remove the event listener after it's used once
        });
    });
});