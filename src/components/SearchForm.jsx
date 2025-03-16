import React, { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'

function SearchForm() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const handleChange = (e) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories = useAppStore((state) => state.categories);
    const addNotification = useAppStore((state)=>state.addNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const searchRecipes = useAppStore((state) => state.searchRecipes)

    const handleSubmit = (e) => {
        e.preventDefault()

        //TODO: Validar
        if (Object.values(searchFilters).includes('')) {
            console.log('Todos los campos son obligatorios')
            return
        }

        // consultar las recetas
        searchRecipes(searchFilters)
    }


    return (
        <form className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-16 p-10 rounded-lg shadow space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-4'>
                <label htmlFor="ingredient" className='block text-white uppercase font-extrabold text-lg'>
                    Nombre o Ingredientes</label>

                <input id='ingredient' type="text" name='ingredient' className='p-3 w-full rounded-lg focus:outline-none bg-white'
                    placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe' value={searchFilters.ingredient} onChange={handleChange} />

            </div>
            <div className='space-y-4'>
                <label htmlFor="category" className='block text-white uppercase font-extrabold text-lg'>Categoria</label>

                <select
                    id="category"
                    name="category"
                    className='p-3 w-full rounded-lg focus:outline-none bg-white'
                    value={searchFilters.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option value={category.strCategory} key={category.strCategory}>
                            {category.strCategory}

                        </option>
                    ))}
                </select>
            </div>

            <input type="submit"
                value='Buscar Recetas'
                className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
            />

        </form>
    )
}

export default SearchForm
