import { useCallback, useState ,useEffect,useRef} from 'react'
// import './App.css'

function App() {
  const [length,setlength]=useState(8);
  const [numall,setnum]=useState(false);
  const [charall,setchar]=useState(false);
  const [password,setpassword]=useState("");
  const passwordRef=useRef(null)
  const passgen=useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (numall) str+="0123456789"
    if (charall) str+="!@#$%^&*-+=()[]{}~`"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)

  },[length,numall,charall,setpassword]
)
const passwordcopy=useCallback(()=>{
  passwordRef.current?.select(),
  window.navigator.clipboard.writeText(password)
},[password])
useEffect(() => {passgen()},[length,numall,charall,setpassword])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700'>
      <h1 className='text-white text-center'>PASSWORD GENERATOR</h1>
      <div className='flex rounded-lg shadow mb-4 overflow-hidden'>
        <input type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}>
        </input>
        <button onClick={passwordcopy}
        className='text-white bg-blue-800 outline-none px-3 py-3 shrink-0 hover:bg-blue-300 hover:text-black'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}>
          
          </input>
          <label className='text-white'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numall}
          id="numberinput"
          onChange={()=>
            setnum((prev)=>!prev)
          }>
          </input>
          <label className='text-white' htmlFor='numberInput'>Numbers</label>
          <input
          type='checkbox'
          defaultChecked={numall}
          id="charecterinput"
          onChange={()=>
            setchar((prev)=>!prev)
          }>
          </input>
          <label className='text-white' htmlFor='charecterInput'>Charecter</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
