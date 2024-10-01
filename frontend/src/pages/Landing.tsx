import { ContainerScroll } from '../component/ui/container-scroll-animation'
import chess from '../assets/chess2.jpeg'
import { Button } from '../component/ui/moving-border'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col overflow-hidden bg-black">
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            Welcome to the  <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              #1 Chess Platform
            </span>
          </h1>
        </>
      }
    >
      <img
        src={chess}
        alt="hero"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-left-middle"
        draggable={false}
      />
    </ContainerScroll>
    <div className='flex justify-center pb-48'>
      <Button  onClick={()=>navigate("/game")}
        borderRadius="1.75rem"
        className="bg-white font-bold dark:bg-green-900 text-white dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Start Game 
      </Button>
    </div>
  </div>
  
  )
}

export default Landing
