<template>
    <div class="container-fluid p-0">
        <div class="row g-4 d-flex align-items-stretch">
            <div class="col-xl-12">
                <UiCard class="h-100">
                    <UiCardName :cardName="`courses`"/>

                    <div class="text-center p-2">
                      <b-form-select v-model="selected" :options="options" class="w-100 custom-select"></b-form-select>
                    </div>

                    <b-table striped hover :items="items" :fields="fields">
                        <template #cell(action)="data">
                            <b class="text-info">
                                <button type="button" class="btn btn-success">
                                    Enroll
                                </button>
                            </b>
                        </template>
                    </b-table>
                </UiCard>
            </div>

        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'semestar',
          },
          {
            key: 'courses_details',
          },
          {
            key: 'instructor',
          },
          {
            key: 'action',
            label: '',
          }
        ],
        items: [
          { instructor: 'Mohamed Adel', courses_details: 'Introduction To Information Technology', semestar: 'Macdonald' },
          { instructor: 'Ibrahim Mamoud', courses_details: 'Fundamentals Of Electronics', semestar: 'Shaw' },
          { instructor: 'Rasha Ezz', courses_details: 'Intensive Mathematics', semestar: 'Wilson' },
          { instructor: 'Ali Mahmoud Ezz', courses_details: 'Probability And Statistics', semestar: 'Carney' },
          { instructor: 'Mamoud Ezz', courses_details: 'Linear Algebra', semestar: 'Carney' }
        ],
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'days', text: 'Minimum Days' },
          { value: 'slots', text: 'Minimum Slots' },

        ]
      }
    }
  }
</script>






<!-- import React, { useState } from 'react';
import { Card, Table, Form } from 'react-bootstrap';

const Index = () => {
    const [selected, setSelected] = useState(null);
    const options = [
        { value: null, label: 'Please select an option' },
        { value: 'days', label: 'Minimum Days' },
        { value: 'slots', label: 'Minimum Slots' }
    ];

    const fields = [
        { key: 'semestar', label: 'Semester' },
        { key: 'courses_details', label: 'Course Details' },
        { key: 'instructor', label: 'Instructor' },
        { key: 'action', label: '' }
    ];

    const items = [
        { instructor: 'Mohamed Adel', courses_details: 'Introduction To Information Technology', semestar: 'Macdonald' },
        { instructor: 'Ibrahim Mamoud', courses_details: 'Fundamentals Of Electronics', semestar: 'Shaw' },
        { instructor: 'Rasha Ezz', courses_details: 'Intensive Mathematics', semestar: 'Wilson' },
        { instructor: 'Ali Mahmoud Ezz', courses_details: 'Probability And Statistics', semestar: 'Carney' },
        { instructor: 'Mamoud Ezz', courses_details: 'Linear Algebra', semestar: 'Carney' }
    ];

    return (
        <div className="container-fluid p-0">
            <div className="row g-4 d-flex align-items-stretch">
                <div className="col-xl-12">
                    <Card className="h-100 p-3">
                        <h5>Courses</h5>
                        <div className="text-center p-2">
                            <Form.Select
                                className="w-100"
                                value={selected}
                                onChange={(e) => setSelected(e.target.value)}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    {fields.map((field, index) => (
                                        <th key={index}>{field.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{item.semestar}</td>
                                        <td>{item.courses_details}</td>
                                        <td>{item.instructor}</td>
                                        <td>
                                            <button type="button" className="btn btn-success">
                                                Enroll
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Index; -->
