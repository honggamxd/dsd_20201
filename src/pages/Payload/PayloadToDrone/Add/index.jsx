
//NEW COMPONENT
import React, { Component } from "react";
import { Form, Input, Button, Select, DatePicker, TimePicker, Alert} from 'antd';
import StyleEdit from '../index.style';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

class AddSignupPayloadDrone extends Component {

  constructor(props) {
    super(props)

    this.state = {
      options: [],
      droneOptions: [],
      sdCardOptions: [],
      visable: false,
      visableAdd: false,
      time: '',
      payloadType: '',
      payloadId: '',
      panning: '',
      titling: '',
      zoom: '',
      manufacturer: '',
      opticalZoom: '',
      digitalZoom: '',
      shooting: [
        {value: '10', label: '10s'},
        {value: '20', label: '20s'},
        {value: '30', label: '30s'},

      ],
      tracking: [
        { value: 'true', label: 'Bật tự động theo dõi' },
        { value: 'false', label: 'tắt tự động theo dõi' },
      ],

      numberOfConfigs: [
         {value: '1', label: '1'},
         {value: '2', label: '2'},
         {value: '3', label: '3'},
         {value: '4', label: '4'},
         {value: '5', label: '5'},
         {value: '6', label: '6'},
         {value: '7', label: '7'},
         {value: '8', label: '8'},
         {value: '9', label: '9'},
         {value: '10', label: '10'},
         {value: '11', label: '11'},
         {value: '12', label: '12'},
         {value: '13', label: '13'},
         {value: '14', label: '14'},
         {value: '15', label: '15'},
         {value: '16', label: '16'},
         {value: '17', label: '17'},
         {value: '18', label: '18'},
         {value: '19', label: '19'},
         {value: '20', label: '20'},
         {value: '21', label: '21'},
         {value: '22', label: '22'},
         {value: '23', label: '23'},
         {value: '24', label: '24'},
         {value: '25', label: '25'},
         {value: '26', label: '26'},
         {value: '27', label: '27'},
         {value: '28', label: '28'},
         {value: '29', label: '29'},
         {value: '30', label: '30'},
         {value: '31', label: '31'},
         {value: '32', label: '32'},
         {value: '33', label: '33'},
         {value: '34', label: '34'},
         {value: '35', label: '35'},
         {value: '36', label: '36'},
         {value: '37', label: '37'},
         {value: '38', label: '38'},
         {value: '39', label: '39'},
         {value: '40', label: '40'},

      ],
      numberConfig: '',
      configs: [],
      showSuccessAlert: false,
      showFailAlert: false,
    }
  }

      componentDidMount() {
        this.getAllPayload();
        this.getAllDrone();
        this.getAllSDCard();
      }
    
      handleChange = event => {
            this.setState({
              // time: event.target.value,
              panning: event.target.value,
              tilting: event.target.value,

              zoom: event.target.value,

              autoTracking: event.target.value,

              shootInterval: event.target.value,
              reason: event.target.value,
              droneId: event.target.value,
              numberOfConfigs: event.target.value,
            });
          }
        
      handleFormSubmit(values) {
        const configsPayload = [];

        for (var i = 0; i < values.numberOfConfigs; i ++) {
          var startTimeName = 'configsStartTime' + i; 
          var endTimeName = "configsEndTime" + i; 
          var objectName = "configsObject" + i; 
          var panName = "configsPan" + i; 
          var tiltName = "configsTilt" + i; 
          var zoomName = "configsZoom" + i; 
          var trackingName = "configsTracking" + i; 
          var shootName = "configsShoot" + i; 

          configsPayload.push({
                  startTime: values[startTimeName].format("HH:mm:ss"),
                  endTime: values[endTimeName].format("HH:mm:ss"),
                  object: values[objectName],
                  config: {
                    panning: values[panName],
                    tilting: values[tiltName],
                    zoom: values[zoomName],
                    autoTracking: values[trackingName],
                    shootInterval: values[shootName]
                  },

          })
        }

            const payloadToDrone = {
              configs: configsPayload,
              droneId: values.droneId,
              payloadId: values.payloadId,
              reason: values.reason,
              sdCardId: values.sdCardId,
            }
            console.log(payloadToDrone.droneId);
        
            axios.post('https://dsd06.herokuapp.com/api/payloadregister/working/' + payloadToDrone.payloadId, payloadToDrone)
                .then(res => {
                console.log(res.data);
                this.setState({showSuccessAlert: true});
                this.props.history.push('/payload-drone');

                // setTimeout(function() {
                // }, 2000)
              })
          }
        
          getAllPayload() {
            axios.get('https://dsd06.herokuapp.com/api/payload?status=idle')
            .then(res => {
              const options = res.data.map(payload =>
                ({
                  label: payload.name,
                  value: payload._id,
                })
              )
              this.setState({Options: options});
            })
          }

          getAllDrone() {
            const startTime = new Date();
            // axios.get('http://skyrone.cf:6789/drone/getAll')
            axios.get('http://skyrone.cf:6789/droneState/getAllDroneActive? timeStart = startTime && timeEnd = null')
            .then(res => {
              console.log(res.data);
              const options = res.data.map(drone => 
                ({
                  // label: drone.code,
                  label: drone.name,
                  value: drone.idDrone
                })  
              )
              this.setState({DroneOptions: options});
            })
          }
          
          getAllSDCard() {
            axios.get('https://dsd06.herokuapp.com/api/sdcard')
            .then(res => {
              const optionSDCard = res.data.map(card => 
                ({
                    label: card.name + card.volume,
                    value: card._id
                })
              )
              this.setState({sdCardOptions: optionSDCard});
            })
          }

          handleSelectNumberOfConfig = (e) => {
            const valueSelected = e;
            this.setState({ numberConfig : valueSelected});
         }
        
         configNumbers() {
          return [...Array(parseInt(this.state.numberConfig || 0)).keys()];
        }

    render() {
      const { visible, visibleAdd, visibleDelete, currentTable, tables} = this.state;

      return (
      <StyleEdit>
      <div className="searchtype">
        {/* <a onClick={() => history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> <a onClick={() => history.push('/add-signup-payload-drone')}>Đăng ký mới</a> */}
        <a onClick={() => this.props.history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> 
        <a onClick={() => this.props.history.push('/add-signup-payload-drone')}>Đăng ký mới</a>

      </div>

      <Form
        {...layout} onFinish= {(values) =>  this.handleFormSubmit(values)}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        { this.state.showSuccessAlert && <Alert type={"success"} data={"Update succesfully"} /> }
        <h3 className="searchtype"  >Thông tin đăng ký</h3>
        {/* <Form.Item
          label="Thời gian"
          name="time"
          rules={[{ required: true  }]}
        >
          <DatePicker/>
          </Form.Item> */}
        <Form.Item label="Số lượng cấu hình" name="numberOfConfigs">
            <Select options={this.state.numberOfConfigs} onChange ={this.handleSelectNumberOfConfig}>
            </Select>
        </Form.Item>
        <Form.Item label="Drone" name ="droneId" rules={[{ required: true }]}>
          <Select options={this.state.DroneOptions}>
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Mô tả"
          name="status"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <TextArea/>
        </Form.Item> */}
        <Form.Item label="Lý do" name="reason">
          <Input placeholder="Lý do"></Input>

        </Form.Item>

        <Form.Item
            label="Thiết bị"
            name="payloadId"
            rules={[{required: true }]}
        >
            <Select options = {this.state.Options}>
            </Select>
        </Form.Item>

        <Form.Item
            label="Loại thẻ nhớ"
            name="sdCardId"
            rules={[{required: true }]}
        >
            <Select options = {this.state.sdCardOptions}>
            </Select>
        </Form.Item>
      
        {/* <Form.Item label="Thời gian bắt đâu" name="startTime" rules={[{required: true, message: 'Please select time!'}]}>
          <TimePicker></TimePicker>
        </Form.Item>
        <Form.Item label="Thời gian kết thúc" name="endTime" rules={[{required: true, message: 'Please select time!'}]}>
          <TimePicker></TimePicker>
        </Form.Item>
        <Form.Item label="Đối tượng" name="object">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Panning(Từ trái qua phải)" name ="pan" rules={[{  message: 'Please input panning!' }]}>
          <Input placeholder="0 độ - 360 độ"></Input>
        </Form.Item>
        <Form.Item label="Tilting(Từ trên xuống dưới)" name ="tilt" rules={[{  message: 'Please input tilting!' }]}>
          <Input placeholder="0 độ - 360 độ"></Input>
        </Form.Item>
        <Form.Item label="Zooming" name ="zoom" rules={[{  message: 'Please input zooming!' }]}>
          <Input placeholder="2.0 Megapixel trở lên"></Input>
        </Form.Item>
        <Form.Item label="Auto Tracking" name ="tracking" rules={[{ }]}>
          <Select options={this.state.tracking}>
          
          </Select>
        </Form.Item>
        <Form.Item label="Shoot interval" name ="shoot" rules={[{  }]}>
          <Select options={this.state.shooting}>
            
          </Select>
        </Form.Item> */}

        {/* FORM DYNAMIC */}
        
        {this.configNumbers().map(i => (
            <Form.Item key={i} name="configs" {...layout} style={{marginLeft: '200px'}}>
               <h4>Cấu hình {i+1}</h4>
              <Form.Item label="Thời gian bắt đâu" name={`configsStartTime${i}`} rules={[{required: true, message: 'Please select time!'}]}>
                <TimePicker></TimePicker>
              </Form.Item>
              <Form.Item label="Thời gian kết thúc" name={`configsEndTime${i}`} rules={[{required: true, message: 'Please select time!'}]}>
                <TimePicker></TimePicker>
              </Form.Item>
              <Form.Item label="Đối tượng" name={`configsObject${i}`}>
                <Input></Input>
              </Form.Item>
              <Form.Item label="Panning(Từ trái qua phải)" name ={`configsPan${i}`} rules={[{  message: 'Please input panning!' }]}>
                <Input placeholder="0 độ - 360 độ"></Input>
              </Form.Item>
              <Form.Item label="Tilting(Từ trên xuống dưới)" name ={`configsTilt${i}`} rules={[{  message: 'Please input tilting!' }]}>
                <Input placeholder="0 độ - 360 độ"></Input>
              </Form.Item>
              <Form.Item label="Zooming" name ={`configsZoom${i}`} rules={[{  message: 'Please input zooming!' }]}>
                <Input placeholder="2.0 Megapixel trở lên"></Input>
              </Form.Item>
              <Form.Item label="Auto Tracking" name ={`configsTracking${i}`} rules={[{ }]}>
                <Select options={this.state.tracking}>
                </Select>
              </Form.Item>
              <Form.Item label="Shoot interval" name ={`configsShoot${i}`} rules={[{  }]}>
                <Select options={this.state.shooting}>
                  
                </Select>
              </Form.Item> 
          </Form.Item>
        ))}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
           Đăng ký
        </Button>
        </Form.Item>
      </Form>
    </StyleEdit>
      )
    }
  
  
}
export default AddSignupPayloadDrone; 