const ENV = "PROD"

let EVNDB = ''

if(ENV === 'DEV') {
    EVNDB = 'tools-dev-6e00f3'
} else {
    EVNDB = 'tools-d732fb'
}

export default EVNDB



