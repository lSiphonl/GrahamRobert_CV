document.addEventListener("mousemove", (event) => {
    document.body.style.setProperty("--x", `${event.clientX}px`);
    document.body.style.setProperty(
        "--y",
        `${event.clientY + window.scrollY}px`
    );
});

const content = document.querySelector(".content");
const scrollTopButton = document.querySelector(".scroll-top");

scrollTopButton.addEventListener("click", () => {
    content.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});