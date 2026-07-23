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

        if (content) {

            content.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

}