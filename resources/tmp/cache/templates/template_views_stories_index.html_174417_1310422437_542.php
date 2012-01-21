

<div class="actionList">
    <span class="stepTitle">Available Actions</span>
    
<?php    
foreach($access as $row)
{
 echo '<div class="actionGroup" id="action[' . $row['id'] . ']">';
 echo '<span class="actionTitle">' . $row['name'] . '</span>';
 echo '<span class="actionDetails">' . $row['description'] . '</span>';
 echo "<span class=\"cookieDetails\">Received Cookies: {$row['recv_cookies']}<br />Sent Cookies: {$row['send_cookies']}</span>";
 echo '</div>';

}
?>
</div>
<span class="buttonesque" onclick="saveStory();">Save</span>