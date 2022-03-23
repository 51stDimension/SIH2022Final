import _ from 'lodash';
// import faker from 'faker';
import React from 'react';
import { Card, Button, Checkbox, Form, Message, Icon, Modal } from 'semantic-ui-react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import source from './districts.json'
import MapComponent from './map'

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))

const initialState = {
    loading: false,
    results: [],
    value: '',
    open: false,
    lat: 0,
    long: 0,
    size: '',
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection, lat: action.lat, long: action.long }
        case 'CLOSE_MODAL':
            return { ...state, open: false}
        case 'EXPAND_MODAL':
            return { ...state, open: true, size: 'large' }
        default:
            throw new Error()
    }
}

function SearchExampleStandard() {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value, open, lat, long, size } = state

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.title)

            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(source, isMatch),
            })
        }, 300)
    }, [])
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    console.log(results)

    return (
        <Grid>
            <Grid.Column width={6}>
                <Search
                    loading={loading}
                    placeholder='Search...'
                    onResultSelect={(e, data) =>
                        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title, lat: data.result.lat, long: data.result.long })
                    }
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
                <br></br>
                <Button onClick={() => dispatch({ type: 'EXPAND_MODAL'})}>
                    <Icon name='desktop' />
                    Analyze
                </Button>
            </Grid.Column>

            <Modal size={size} open={open}>
                <Modal.Header>Advanced Analysis</Modal.Header>
                <Modal.Content>
                    <MapComponent lat={lat} long={long}></MapComponent>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </Grid>
    )
}

export default SearchExampleStandard;