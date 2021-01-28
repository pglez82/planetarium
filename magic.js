var north = 'N';
var south = 'S';
var west = 'W';
var east = 'E';

function invokeMagic()
{
    // Some important variables
    var canvas = document.getElementById('canvas');
    var size = canvas.height;
    var context = canvas.getContext('2d');
    var gradient;
    var bodies = stars;
    
    // Place and time
    var longitudeSign = parseInt(document.getElementById('longitude_sign').value, 10);
    var longitudeDegrees = parseInt(document.getElementById('longitude_degrees').value, 10);
    var longitudeMinutes = parseInt(document.getElementById('longitude_minutes').value, 10);
    var longitudeSeconds = parseInt(document.getElementById('longitude_seconds').value, 10);
    var longitude = toRadians(longitudeSign * (longitudeDegrees + longitudeMinutes / 60 + longitudeSeconds / 3600));
    var latitudeSign = parseInt(document.getElementById('latitude_sign').value, 10);
    var latitudeDegrees = parseInt(document.getElementById('latitude_degrees').value, 10);
    var latitudeMinutes = parseInt(document.getElementById('latitude_minutes').value, 10);
    var latitudeSeconds = parseInt(document.getElementById('latitude_seconds').value, 10);
    var latitude = toRadians(latitudeSign * (latitudeDegrees + latitudeMinutes / 60 + latitudeSeconds / 3600));
    var year = parseInt(document.getElementById('year').value, 10);
    var month = parseInt(document.getElementById('month').value, 10);
    var day = parseInt(document.getElementById('day').value, 10);
    var hours = parseInt(document.getElementById('hours').value, 10);
    var minutes = parseInt(document.getElementById('minutes').value, 10);
    var seconds = parseInt(document.getElementById('seconds').value, 10);
    var timeZone = parseInt(document.getElementById('time_zone').value, 10);
    var julianDay = toJulianDay(year, month, day, hours - timeZone, minutes, seconds);
    
    // Black background
    context.clearRect(0, 0, size, size);
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    context.fillStyle = '#000000';
    context.fill();
    
    for(var i = 0; i < bodies.length; i++)
    {
        var body = bodies[i];
        var altitude = body.altitude(julianDay, longitude, latitude);
        
        // Stars
        if(body instanceof Star)
        {
            if(altitude >= 0)
            {
                var azimuth = body.azimuth(julianDay, longitude, latitude);
                var x = size / 2 + size / 2 * Math.cos(altitude) * Math.sin(azimuth);
                var y = size / 2 + size / 2 * Math.cos(altitude) * Math.cos(azimuth);
                var magnitude = Math.max(6.5 - body.magnitude, 0);
                context.beginPath();
                context.arc(x, y, magnitude, 0, 2 * Math.PI);
                gradient = context.createRadialGradient(x, y, 0, x, y, magnitude);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
                context.fillStyle = gradient;
                context.fill();
                
                if(body.name != null)
                {
                    context.fillStyle = '#FFFFFF';
                    context.fillText(body.name, x, y);
                }
            }
        }        
    }
}