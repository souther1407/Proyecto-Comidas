import { render, screen } from '@testing-library/react';
import DetalleReceta from '../components/DetalleReceta/DetalleReceta';

test("debe mostrar el titulo de la receta" ,()=>{
    render(<DetalleReceta />)
    const titulo = screen.getByTestId("titulo")
    expect(titulo).toBeInTheDocument()

})

