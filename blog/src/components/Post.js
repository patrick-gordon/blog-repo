import React, { Component } from 'react'
import { 
    Container, 
    ListGroup, 
    ListGroupItem,
    Button, 
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
 } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts, deletePost, addPost } from '../actions/postActions'
import PropTypes from 'prop-types'


 class Post extends Component {
    state = {
        // isOpen: false,
        // modal: false,
        // title: '',
        // body: '',
       
    }

    componentDidMount() {
        this.props.getPosts();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

   

    onSubmit = e => {
        e.preventDefault();

        const newPost = {
            title: this.state.title,
            body: this.state.body
        };

        this.props.addPost(newPost);

        this.toggle();
    }
   

    render() {  
        const { posts } = this.props.post;
        console.log(posts)
        return (
            <div>
                <Container>
                <Button
                    color='dark'
                    style={{marginTop: '3rem', marginBottom: '3rem'}}
                    onClick={this.toggle}
                    >Add Post
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add A Post</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for='title'>title</Label>
                                <Input 
                                    type='text'
                                    name ='title'
                                    title='title' //match state
                                    // id='item'
                                    placeholder='Add Title For Post'
                                    onChange={this.onChange}
                                 />
                            <Label for='post'>post</Label>
                                <Input 
                                    type='textarea'
                                    name ='contents'
                                    body='body' //match state
                                    // id='item'
                                    placeholder='Add Post'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color='dark'
                                    block
                                    style={{marginTop: '2rem'}}
                                >Add Post</Button>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    </Modal>
                    <ListGroup className='posts'>
                        {posts.map(({ id, title, contents}) => (
                           <ListGroupItem style={{display: 'flex'}}>
                               <Button
                               className='remove-btn'
                               color='danger'
                               size='sm'
                               onClick={this.onDeleteClick.bind(this, id)}
                               >
                                 &times;
                               </Button>
                               <div>
                                <h4>Title: {title}</h4><br></br>
                                <p>Contents: {contents}</p>
                                </div>
                           </ListGroupItem>
                        ))}
                    </ListGroup>
                   
                </Container>
            </div>
        )
    }
}

Post.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost, addPost })(Post)
