import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                label: 'block mb-1 font-bold text-lg',
                message: 'text-red-600 mb-5',
                wrapper: 'space-y-2 mb-3',
                input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400'
            },
            file: {
                noFiles: 'hidden',
                fileItem: 'hidden'
            },
            submit: {
                input: '$reset bg-orange-400 hover:bg-orange-500 w-full p-2 font-bold uppercase disabled:opacity-50'
            }
        })
    }
}

export default config