import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEducation, cilBalanceScale, cilCalendar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const WidgetsBrand = (props) => {
    const chartOptions = {
        elements: {
            line: {
                tension: 0.4,
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            },
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    }

    return (
        <CRow className={props.className} xs={{ gutter: 4 }}>
            <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsD
                    {...(props.withCharts && {
                        chart: (
                            <CChart
                                className="position-absolute w-100 h-100"
                                type="line"
                                data={{
                                    labels: [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                    ],
                                    datasets: [
                                        {
                                            backgroundColor: 'rgba(255,255,255,.1)',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            pointHoverBackgroundColor: '#fff',
                                            borderWidth: 2,
                                            data: [65, 59, 84, 84, 51, 55, 40],
                                            fill: true,
                                        },
                                    ],
                                }}
                                options={chartOptions}
                            />
                        ),
                    })}
                    icon={<CIcon icon={cilEducation} height={52} className="my-4 text-white" />}
                    values={[
                        { title: 'Total Program', value: '1' },
                        { title: 'Total Courses', value: '5' },
                        { title: 'E-learner', value: '2' },
                    ]}
                    style={{
                        '--cui-card-cap-bg': '#0d6efd',
                    }}
                />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsD
                    {...(props.withCharts && {
                        chart: (
                            <CChart
                                className="position-absolute w-100 h-100"
                                type="line"
                                data={{
                                    labels: [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                    ],
                                    datasets: [
                                        {
                                            backgroundColor: 'rgba(255,255,255,.1)',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            pointHoverBackgroundColor: '#fff',
                                            borderWidth: 2,
                                            data: [1, 13, 9, 17, 34, 41, 38],
                                            fill: true,
                                        },
                                    ],
                                }}
                                options={chartOptions}
                            />
                        ),
                    })}
                    icon={<CIcon icon={cilCalendar} height={52} className="my-4 text-white" />}
                    values={[
                        { title: 'Done Training', value: '3' },
                        { title: 'Pending Training', value: '8' },
                        { title: 'Ongoing Traing', value: '1' },
                    ]}
                    style={{
                        '--cui-card-cap-bg': '#00aced',
                    }}
                />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsD
                    {...(props.withCharts && {
                        chart: (
                            <CChart
                                className="position-absolute w-100 h-100"
                                type="line"
                                data={{
                                    labels: [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                    ],
                                    datasets: [
                                        {
                                            backgroundColor: 'rgba(255,255,255,.1)',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            pointHoverBackgroundColor: '#fff',
                                            borderWidth: 2,
                                            data: [78, 81, 80, 45, 34, 12, 40],
                                            fill: true,
                                        },
                                    ],
                                }}
                                options={chartOptions}
                            />
                        ),
                    })}
                    icon={<CIcon icon={cilBalanceScale} height={52} className="my-4 text-white" />}
                    values={[
                        { title: 'Total Budget', value: '120k' },
                        { title: 'Training Budget Used', value: '30k' },
                        { title: 'Remaining', value: '90k' },
                    ]}
                    style={{
                        '--cui-card-cap-bg': '#dc3545',
                    }}
                />
            </CCol>
        </CRow>
    )
}

WidgetsBrand.propTypes = {
    className: PropTypes.string,
    withCharts: PropTypes.bool,
}

export default WidgetsBrand
