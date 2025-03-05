//eventos del calendario
export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleaños de Fernando',
        notes: 'Alguna nota'
    },
    {
        id: '2',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
        title: 'Cumpleaños de Melissa',
        notes: 'Alguna nota de Melissa'
    },
];

//estado inicial del calendario
export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


//calendario si evento activo
export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
}


//calendario con evento activo
export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}





