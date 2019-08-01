/*
** Helper Functions
*/

import {
  readFile
} from './utils/helpers'


const runMainApp = (file: string) => {
  readFile(file)
}

runMainApp(process.argv[2])
