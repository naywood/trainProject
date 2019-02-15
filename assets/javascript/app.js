
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCcb_CSvNk5bHlcPZDcM8XXOGDeTF-2tt4",
    authDomain: "train-scheduler-bb0db.firebaseapp.com",
    databaseURL: "https://train-scheduler-bb0db.firebaseio.com",
    projectId: "train-scheduler-bb0db",
    storageBucket: "train-scheduler-bb0db.appspot.com",
    messagingSenderId: "416477849139"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $('#addTrainBtn').on("click", function(){
        var trainName = $('#trainNameInput').val().trim();
        var destination = $('#destinationInput').val().trim();
        var firstTrain = moment($('#firstTrainInput').val().trim(),"HH:mm").subtract(10, "years").format("X");
        var frequency = $('#frequencyInput').val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }

        trainData.ref().push(newTrain);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");

  })

 trainData.ref().on("child_added", function(snapshot){
     var name = snapshot.val().name;
     var destination = snapshot.val().destination;
     var frequency = snapshot.val().frequency;
     var firstTrain =  snapshot.val().firstTrain;

     var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
     var minutes = frequency - remainder;
     var arrival = moment().add( minutes, "m").format("hh:mm A")

     $("#trainTable> tBody").append("<tr><td>"+name+ "</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
      
 })