document.addEventListener("mousemove", (event) => {
    document.body.style.setProperty("--x", `${event.clientX}px`);
    document.body.style.setProperty(
        "--y",
        `${event.clientY + window.scrollY}px`
    );
});

const content = document.querySelector(".content");
const scrollTopButton = document.querySelector(".scroll-top");

if (scrollTopButton) {

    scrollTopButton.addEventListener("click", () => {

        const content = document.querySelector(".content");

        if (content && content.scrollHeight > content.clientHeight) {

            // .content is the scrolling container
            content.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            // The page itself is scrolling
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".side-nav a");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
            link.classList.remove("active");
        });

        const activeLink = document.querySelector(
            `.side-nav a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }

    });

}, {
    threshold: 0.4
});

sections.forEach(section => observer.observe(section));