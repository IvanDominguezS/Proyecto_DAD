import { Index } from './components/Index';
import { DarkModeProvider } from './context/DarkModeContext';
import { CartProvider } from './context/BookCartContext';
import { LoginProvider } from './context/LoginContext';

function App() {
  

  return (
    <CartProvider> 
      <LoginProvider>
        <DarkModeProvider>
          <Index/>
        </DarkModeProvider>
      </LoginProvider>
    </CartProvider>
  )
}

export default App
