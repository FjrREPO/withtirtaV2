import AnimateParagraph from "./AnimateParagraph"
import AnimateTitle from "./AnimateTitle"

export default function About() {
  const birthDate = new Date('2001-10-04');
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthDate);

  return (
    <section
      id="about"
      className="relative flex min-h-[50vh] my-10 w-full items-center justify-center overflow-hidden"
    >
      <div className="mx-auto flex w-[90%] flex-col items-start justify-center lg:max-w-[1212.8px]">
        <div className="mb-10 flex w-full items-center justify-between gap-x-2 md:mb-16">
          <AnimateTitle
            title={"About me"}
            className="text-left text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
            wordSpace="mr-[14px]"
            charSpace="mr-[0.0001em]"
          />
        </div>

        <div className="mx-auto flex w-full flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          <div className="lg:mg-16 mb-10 flex w-full flex-col gap-4 text-[18px] font-medium leading-relaxed tracking-wide md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:max-w-[90%] lg:text-base">
            <AnimateParagraph
              paragraph={`Hi my name is Aulia Ikhsan Tirta, I am a ${age} years old professional Video Editor & Videographer from Magelang, Central Java, Indonesia ! I learned self-taught video editing.I started my own business as an editor and now work as a freelancer for several clients. When I’m not not in my editing suite, I love to travel around the world and capture the moments in short cinematic videos, which I share on my Instagram.`}
              delay={1.5}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
