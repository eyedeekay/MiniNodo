//old format sample data..

var Txn = React.createClass({
    render: function () {
        var address;
        if (this.props.destination == 'none') {
            address = this.props.xmraddr;
        } else {
            address = this.props.destination;
        }
    
        return (
            <div className="email-item pure-g">
                <div className="pure-u-3-4">
                    <h5 className="email-name">{this.props.time}</h5>
                    <h4 className="email-subject">{this.props.xmramount} XMR</h4>
                    <p className="email-desc">
                        Destination: {address}
                    </p>
                </div>
            </div>
        );
    }
});

//Basically, I want a smooth e-mailish Txn List
//You click on the txn, and it opens more details
var TxnList = React.createClass({

    render: function () {

        var items = this.props.txns.map(function (txn) {
            return (
                <Txn
                    time={txn.time}
                    xmramount={txn.xmramount}
                    destination={txn.destination}
                    xmraddr={txn.xmraddr}
                    >
                    "tx"
                </Txn>
            );
        });

        return (
            <div id="list" className="pure-u-1">
                {items}
            </div>
        );
    }
});

document.getElementById("txnlink").onclick = writeTxns;

function writeTxns() {
    var theUrl = 'https://localhost:3000/api/localtransactions/';

    $.get(
        theUrl,
        function (data) {
            document.getElementById("qrcode").innerHTML = '';
            document.getElementById('innercontent').innerHTML = '';
            ReactDOM.render(
                <TxnList txns={JSON.parse(data) } />,
                document.getElementById('innercontent')
            );
        }
    );
}