import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const TableExamplePagination = () => (
  <div>
    <h3>GET https://api.sonosannounce.com/v1/announce</h3>
  <Table celled>
  <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
  <Table.Row>
        <Table.Cell>api_key</Table.Cell>
        <Table.Cell>string</Table.Cell>
        <Table.Cell>Use the API key from above</Table.Cell>
      </Table.Row>
      </Table.Body>

    </Table>
   
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Parameter</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>text</Table.Cell>
        <Table.Cell>string</Table.Cell>
        <Table.Cell>Message to announce</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>all</Table.Cell>
        <Table.Cell>bool</Table.Cell>
        <Table.Cell>true if you want all speakers to announce. Default: True</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>voice</Table.Cell>
        <Table.Cell>string</Table.Cell>
        <Table.Cell>Name of the voice to use. Available options: Jemma, Justin, Anna, John</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>volume</Table.Cell>
        <Table.Cell>number</Table.Cell>
        <Table.Cell>Volume from 0 - 100. Default: 50</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>speakers</Table.Cell>
        <Table.Cell>string</Table.Cell>
        <Table.Cell>name of speakers to announce on. Use commas to separate between them.</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  </div>
)

export default TableExamplePagination