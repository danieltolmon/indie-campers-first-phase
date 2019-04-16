const expect = require('expect')
const logic = require('.')

const { mongoose } = require("../../../phase-2/indie-campers-data/src")

describe('logic', () => {
    
    before(() => mongoose.connect('mongodb://localhost/indie-campers', { useNewUrlParser: true }))

    describe('get list of highlights', ()=>{
        it('should work in correct data', async ()=>{
            const start='Barcelona'
            const end='Lisbon'

            const routes = await logic.listHighlights(start, end)
            expect(routes.length).toBe(3)
            expect(routes[0].start).toBe('Barcelona')
            expect(routes[1].start).toBe('Lisbon')
            expect(routes[2].start).toBe('Barcelona')
            expect(routes[0].end).toBe('Lisbon')
            expect(routes[1].end).toBe('Barcelona')
            expect(routes[2].end).toBe('Lisbon')
        }),
        it('should retrun empty array in not fount routes', async ()=>{
            const start='Madrid'
            const end='Lisbon'

            const routes = await logic.listHighlights(start, end)
            expect(routes.length).toBe(0)
        }),
        it('should throw error in same start and end points', ()=>{
            const start='Lisbon'
            const end='Lisbon'

            expect(() => {
                logic.listHighlights(start, end)
            }).toThrow(Error("start and end cannot be the same"))
        }),
        it('should throw error empty start', ()=>{
            const start=''
            const end='Lisbon'

            expect(() => {
                logic.listHighlights(start, end)
            }).toThrow(Error("start cannot be empty"))
        }),
        it('should throw error in start not being a string', ()=>{
            const start=123
            const end='Lisbon'

            expect(() => {
                logic.listHighlights(start, end)
            }).toThrow(TypeError(start + " is not a string"))
        }),
        it('should throw error empty end', ()=>{
            const start='Lisbon'
            const end=''

            expect(() => {
                logic.listHighlights(start, end)
            }).toThrow(Error("end cannot be empty"))
        }),
        it('should throw error in end not being a string', ()=>{
            const start='Lisbon'
            const end=123

            expect(() => {
                logic.listHighlights(start, end)
            }).toThrow(TypeError(end + " is not a string"))
        })
    }),

    describe('retrieve closest highlight from lat and lng', ()=>{
        it('should work in correct data', async ()=>{
            const lat= 38.724697
            const lng=- 9.140790

            const highlight = await logic.retrieveClosestHighlight(lat, lng)
            expect(highlight.title).toBe('Lagos')
            
        }),
        
       
        it('should throw error in lat not being a number', ()=>{
            const lat= 'Lisbon'
            const lng=- 9.140790


            expect(() => {
                logic.retrieveClosestHighlight(lat, lng)
            }).toThrow(TypeError(lat + " is not a number"))
        }),

        it('should throw error in lng not being a number', ()=>{
            const lat=- 9.140790
            const lng= 'Lisbon'


            expect(() => {
                logic.retrieveClosestHighlight(lat, lng)
            }).toThrow(TypeError(lng + " is not a number"))
        })
    })

    after(() => mongoose.disconnect())

})