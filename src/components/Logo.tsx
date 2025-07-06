import { Tractor } from 'lucide-react'
import {BrainCircuit} from 'lucide-react'

interface ILogo{
    className?:string;
    onlyLogo?:boolean;
}

const Logo = ({className,onlyLogo}:ILogo) => {
  return (
    <div className={`flex items-center gap-2 
    text-3xl text-white font-bold ${className ? className:''}`}>
        <BrainCircuit className='size-7 text-primary'/>
        {!onlyLogo && <h1><span className='text-black'>Soul</span><span className='text-primary'>Sync</span></h1>}
    </div>
  )
}

export default Logo