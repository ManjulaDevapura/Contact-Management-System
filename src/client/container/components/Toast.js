import React, { Component } from 'react'
import $ from 'jquery'

const width = window.innerWidth;
export default class Toast extends Component {
    render() {
        var color = '';
        // this.props.value === '' ? color = '#d4edda' : color = '#f8d7da'

        return (
            <div style={{ width: `${width / 5}px` }}>
                <div id='toastHeader' className='toast-header' style={{ backgroundColor: $('#errVal').val() === '' ? color = '#d4edda' : color = '#f8d7da' }} >
                    {/* {this.props.value === '' ? <i className="fas fa-thumbs-up fa-fw" style={{ color: '#155724' }}></i> : <i className="fas fa-exclamation-circle fa-fw" style={{ color: '#975057' }}></i>} */}
                    {$('#errVal').val() === ''
                        ? <div id='validMsg' className="mr-auto" style={{ color: '#155724', fontFamily: 'Roboto', fontWeight: '600' }}>
                            <i className="far fa-check-circle"></i> Updated Successfully...!</div>
                        : <strong className="mr-auto" style={{ color: '#975057', fontFamily: 'Roboto', fontWeight: '600' }}> UPDATE FAILD...!</strong>}

                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    <p id='errVal'></p>
                    {/* {this.props.value === '' ? 'Updated success' : this.props.value} */}
                </div>
            </div>
        )
    }
}
