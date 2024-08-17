import isfp from "/assets/isfp.png";


const Details = () => {
    return (
    <section id="home ">
        <article className="overflow-hidden p-12" id="whoami">
        
        <p className="font-mono text-xl whitespace-break-spaces">In the digital realm, Kenny is a skilled programmer with a passion for solving complex puzzles and creating innovative solutions. Always eager to explore new technologies, Kenny excels in crafting web applications and delving into data science, constantly growing and learning in the ever-evolving world of programming</p>
        <div className="flex justify-start items-center flex-col scale-105 mt-10">
            <img alt="isfp" src={isfp} className="rounded-2xl xl:max-h-48 xl:max-w-48 lg:max-h-24 lg:max-w-24 max-md:max-w-28 max-md:max-h-28 max-lg:max-w-24 max-lg:max-h-24"/>
                <span className="text-lg font-mono  text-cyan-200 italic ">ISFP 🎨</span>
            </div>
        </article>

    </section>
    )
}

export default Details