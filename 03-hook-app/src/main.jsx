import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";



//import { FormWithCustomHook } from './FormWithCustomHook/FormWithCustomHook';

//UseState
//import { CounterApp } from './01-useState/CounterApp';
//import { CounterWithCustomHook } from './01-useState/CounterWithCustomHook';

//useEffect
// import { SimpleForm } from './02-useEffect/SimpleForm';

//Custom Hook
// import { FormWithCustomHook } from './02-useEffect/FormWithCustomHook';
 
//Multiples hooks
// import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks';

//useRef
// import { FocusScreen } from './04-useRef/FocusScreen';

//memo
// import { Memorize } from './06-memos/Memorize';

//useMemo
// import { MemoHook } from './06-memos/MemoHook';

//callbackHook
// import { CallbackHook } from './06-memos/CallbackHook';
//import { Padre } from './07-tarea-memo/Padre';

//useReducer
//import { TodoApp } from './08-useReducer/TodoApp'

//useContext
import { MainApp } from './09-UseContext/MainApp';


createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
      <StrictMode>
          {/* <FormWithCustomHook/> */}
          {/* <CounterApp/> */}
          {/* <CounterWithCustomHook/> */}
          {/* <SimpleForm />  */}
          {/* <FormWithCustomHook/>   */}
          {/* <MultipleCustomHooks />  */}
          {/* <FocusScreen />  */}
          
          {/* <Memorize />  */}
          {/* <MemoHook />  */}
          
          {/* <CallbackHook />  */}
          {/* <Padre /> */}

        {/* <TodoApp /> */}

        <MainApp/>

      </StrictMode>
  </BrowserRouter>
)

