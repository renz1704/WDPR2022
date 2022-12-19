var Comp = React.createClass({
    render: function () {
        return (
            <div>
                <h1> Dit is test component</h1>
            </div>
        )
    }
});

React.render(<Comp />, document.getElementById("testComponent"));

