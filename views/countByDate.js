// countByDate.js
// Purpose:
// Groups messages by their date pieces (YYYY-MM-DD) in the From: header of the email
// Usage: 
// This javascript function can be pasted into Futon
// or uploaded with curl as a design document

function(doc) 
{
    var month=new Array(12);
    month["JAN"]="01";
    month["FEB"]="02";
    month["MAR"]="03";
    month["APR"]="04";
    month["MAY"]="05";
    month["JUN"]="06";
    month["JUL"]="07";
    month["AUG"]="08";
    month["SEP"]="09";
    month["OCT"]="10";
    month["NOV"]="11";
    month["DEC"]="12";

    if(doc.Date)
    {
        datestr = new Array(3);
        pieces = doc.Date.split(/\s+/);
        
        // Handling dates in very different formats was something of a hack
        // There were only 44 messages (out of 131000) that were either case 2 or 3
        // There are still 4 messages that these cases don't solve for. I ignore those.
        
        // CASE 1: Tue, 19 Mar 2002 12:48:03 -0800
        // CASE 2: Tue, May 3 2000...
        // CASE 3: Mon Aug 12 11:32:39 1996
        // CASE 4: 01 Nov 2002 06:51:39 -0500
        
        
        // CASE 1, 2, 3
        if (isNaN(pieces[0]))
        {        
            // CASE 2 & 3
            if (isNaN(pieces[1]))
            {
                if ((pieces[2].length == 1) &&(pieces[2].substring(0) != '0'))
                {
                    pieces[2] = '0' + pieces[2];
                }
                
                // CASE 3: Mon Aug 12 11:32:39 1996
                if (pieces[3].length > 4)
                {
                    datestr[1] = month[pieces[1].toUpperCase()]; // day
                    datestr[2] = pieces[2];                      // month
                    datestr[0] = pieces[4];                      // year
                }
                
                // CASE 2: Tue, May 3 2000
                else 
                {
                    datestr[1] = month[pieces[1].toUpperCase()];
                    datestr[2] = pieces[2];
                    datestr[0] = pieces[3];
                }
            }
            // CASE 1: Tue, 19 Mar 2002
            else
            {
                // add a zero to the day if it is a single digit with no leading 0
                // ex: 8 Jul
                if ((pieces[1].length == 1) &&(pieces[1].substring(0) != '0'))
                {
                    pieces[1] = '0' + pieces[1];
                }
                datestr[1] = month[pieces[2].toUpperCase()];
                datestr[2] = pieces[1];
                datestr[0] = pieces[3];
            }
        }
        // CASE 4: 01 Nov 2002
        else
        {
            if ((pieces[0].length == 1) &&(pieces[0].substring(0) != '0'))
            {
                pieces[0] = '0' + pieces[0];
            }

            datestr[1] = month[pieces[1].toUpperCase()];
            datestr[2] = pieces[0];
            datestr[0] = pieces[2];
        }
        
        // handle old school Y2K date issues
        if (datestr[0] == 100) // about 10 records had a year of "100"
        {
            datestr[0] = "2000";
        }
        else if (datestr[0].length == 2) // about 35 records had a two-digit year
        {
            if (datestr[0] > 94)
            {
                year = parseInt(datestr[0]) + 1900;
                datestr[0] = year.toString();
            }
            else 
            {
                year = parseInt(datestr[0]) + 2000;
                datestr[0] = year.toString();
            }
        }
        emit(datestr); 
    }
}